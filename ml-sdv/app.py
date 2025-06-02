import streamlit as st
import pandas as pd
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
import matplotlib.pyplot as plt
import pydeck as pdk
from datetime import datetime

# Configuration de la page
st.set_page_config(layout="wide", page_title="Dashboard Transilien")

# Titre de l'application
st.title("Dashboard Transilien - Analyse du Trafic en Île-de-France")

# Chargement des données (simulé - à adapter avec vos fichiers réels)
@st.cache_data
def load_data():
    # Données de comptage des voyageurs
    voyageurs = pd.read_csv("voyageurs-montant-en-gare-sur-le-reseau-transilien 1.csv", sep=";")
    
    # Données des gares
    gares = pd.read_csv("emplacement-des-gares-idf.csv", sep=";")
    
    # Données de régularité
    regularite = pd.read_csv("regularite-mensuelle-transilien.csv", sep=";")
    
    # Données d'émissions CO2
    emissions = pd.read_csv("emission-de-co2e-par-voyageur-kilometre-sur-le-reseau.csv", sep=";")
    
    return voyageurs, gares, regularite, emissions

voyageurs, gares, regularite, emissions = load_data()

# Sidebar pour la navigation
st.sidebar.title("Navigation")
view = st.sidebar.radio("Sélectionnez une vue:", 
                       ["Vue Récapitulative", "État du Trafic en Temps Réel", "Carte des Gares et Lignes", "Simulation d'Impact"])

# Vue Récapitulative du Trafic
if view == "Vue Récapitulative":
    st.header("Vue Récapitulative du Trafic")
    
    # Section KPIs
    st.subheader("Indicateurs Clés")
    col1, col2, col3 = st.columns(3)
    
    with col1:
        # Affluence quotidienne moyenne (jour ouvrable)
        affluence = voyageurs[voyageurs['Type jour'] == 'JOB']['Somme de Montants'].mean()
        st.metric("Affluence moyenne (JOB)", f"{int(affluence):,} voyageurs")
    
    with col2:
        # Ponctualité moyenne (3 derniers mois disponibles)
        regularite['Date'] = pd.to_datetime(regularite['Date'])
        last_3_months = regularite.sort_values('Date', ascending=False).head(3)
        ponctualite = last_3_months['Taux de ponctualité'].mean()
        st.metric("Ponctualité moyenne (3 derniers mois)", f"{ponctualite:.1f}%")
    
    with col3:
        # Ligne la plus émettrice
        max_emission = emissions.loc[emissions['co2e_voy_km'].idxmax()]
        st.metric("Ligne la plus émettrice", 
                 f"{max_emission['name_line']} ({max_emission['co2e_voy_km']} gCO2/km/voy.)")
    
    # Section Graphiques
    st.subheader("Visualisations")
    
    # Heatmap des heures de pointe
    st.markdown("**Heatmap des heures de pointe**")
    heatmap_data = voyageurs.groupby(['Tranche horaire', 'Nom Gare'])['Somme de Montants'].mean().reset_index()
    top_10_gares = heatmap_data.groupby('Nom Gare')['Somme de Montants'].mean().nlargest(10).index
    heatmap_data = heatmap_data[heatmap_data['Nom Gare'].isin(top_10_gares)]
    
    fig = px.density_heatmap(heatmap_data, x='Tranche horaire', y='Nom Gare', 
                            z='Somme de Montants', histfunc="avg",
                            color_continuous_scale='Viridis')
    st.plotly_chart(fig, use_container_width=True)
    
    # Évolution de la ponctualité
    st.markdown("**Évolution de la ponctualité**")
    regularite_line = regularite.groupby('Date')['Taux de ponctualité'].mean().reset_index()
    fig = px.line(regularite_line, x='Date', y='Taux de ponctualité',
                 title="Taux de ponctualité moyen par mois")
    fig.add_hline(y=95, line_dash="dash", line_color="red", 
                 annotation_text="Objectif: 95%", annotation_position="bottom right")
    st.plotly_chart(fig, use_container_width=True)
    
    # Répartition modale des émissions
    st.markdown("**Répartition des émissions par mode de transport**")
    emissions_par_mode = emissions.groupby('transportmode')['co2e_voy_km'].mean().reset_index()
    fig = px.pie(emissions_par_mode, values='co2e_voy_km', names='transportmode',
                title="Émissions moyennes par mode de transport (gCO2/km/voyageur)")
    st.plotly_chart(fig, use_container_width=True)

# Vue "État du Trafic en Temps Réel"
elif view == "État du Trafic en Temps Réel":
    st.header("État du Trafic en Temps Réel")
    
    # Simulation de données d'événements (à remplacer par vos données réelles)
    evenements = pd.DataFrame({
        'Type': ['Grève', 'Manifestation', 'Accident'],
        'Localisation': ['Gare du Nord', 'Châtelet', 'La Défense'],
        'Lignes Impactées': ['RER B, D', 'RER A, B, D', 'RER A, Ligne L'],
        'Durée Restante': ['3h', '2h', '1h']
    })
    
    # Carte Interactive
    st.subheader("Carte Interactive du Trafic")
    
    # Préparation des données géographiques des gares
    gares['lat'] = gares['Geo Point'].str.split(',').str[0].astype(float)
    gares['lon'] = gares['Geo Point'].str.split(',').str[1].astype(float)
    
    # Couche des gares
    gares_layer = pdk.Layer(
        "ScatterplotLayer",
        data=gares,
        get_position=['lon', 'lat'],
        get_color=[0, 0, 255, 140],
        get_radius=200,
        pickable=True
    )
    
    # Configuration de la vue
    view_state = pdk.ViewState(
        latitude=48.8566,
        longitude=2.3522,
        zoom=10,
        pitch=40
    )
    
    # Rendu de la carte
    st.pydeck_chart(pdk.Deck(
        layers=[gares_layer],
        initial_view_state=view_state,
        tooltip={"text": "{nom_long}\nLignes: {idrefligc}"}
    ))
    
    # Tableau Synoptique
    st.subheader("Événements en Cours")
    st.table(evenements)

# Vue "Carte des Gares et Lignes"
elif view == "Carte des Gares et Lignes":
    st.header("Carte des Gares et Lignes")
    
    # Filtres
    col1, col2 = st.columns(2)
    
    with col1:
        # Filtre par ligne
        lignes_disponibles = gares['idrefligc'].unique()
        ligne_selectionnee = st.selectbox("Filtrer par ligne:", ['Toutes'] + list(lignes_disponibles))
    
    with col2:
        # Filtre par plage horaire
        tranches_horaires = voyageurs['Tranche horaire'].unique()
        tranche_selectionnee = st.selectbox("Filtrer par tranche horaire:", ['Toutes'] + list(tranches_horaires))
    
    # Préparation des données
    if ligne_selectionnee != 'Toutes':
        gares_filtrees = gares[gares['idrefligc'] == ligne_selectionnee]
    else:
        gares_filtrees = gares.copy()
    
    # Calcul de l'affluence moyenne par gare
    affluence_par_gare = voyageurs.groupby('Nom Gare')['Somme de Montants'].mean().reset_index()
    
    # Jointure avec les données géographiques
    gares_affluence = pd.merge(gares_filtrees, affluence_par_gare, 
                              left_on='nom_long', right_on='Nom Gare', how='left')
    
    # Création de la carte
    st.subheader("Visualisation Cartographique")
    
    # Définition des couleurs en fonction du nombre de lignes
    gares_affluence['color'] = gares_affluence['idrefligc'].apply(
        lambda x: [255, 0, 0] if len(x.split(',')) > 3 else [0, 255, 0])
    
    # Couche des gares
    gares_layer = pdk.Layer(
        "ScatterplotLayer",
        data=gares_affluence,
        get_position=['lon', 'lat'],
        get_color='color',
        get_radius=100 + gares_affluence['Somme de Montants'] / 10,
        pickable=True
    )
    
    # Configuration de la vue
    view_state = pdk.ViewState(
        latitude=48.8566,
        longitude=2.3522,
        zoom=10,
        pitch=40
    )
    
    # Rendu de la carte
    st.pydeck_chart(pdk.Deck(
        layers=[gares_layer],
        initial_view_state=view_state,
        tooltip={"text": "{nom_long}\nAffluence moyenne: {Somme de Montants:.0f} voyageurs"}
    ))

# Vue "Simulation d'Impact"
elif view == "Simulation d'Impact":
    st.header("Simulation d'Impact sur l'Affluence")
    
    # Sélecteurs de paramètres
    col1, col2, col3 = st.columns(3)
    
    with col1:
        gare_selectionnee = st.selectbox("Sélectionnez une gare:", voyageurs['Nom Gare'].unique())
    
    with col2:
        tranche_horaire = st.select_slider("Sélectionnez une tranche horaire:", 
                                          options=voyageurs['Tranche horaire'].unique())
    
    with col3:
        greve_en_cours = st.checkbox("Grève en cours")
    
    # Simulation simple (à remplacer par un vrai modèle ML)
    affluence_moyenne = voyageurs[
        (voyageurs['Nom Gare'] == gare_selectionnee) & 
        (voyageurs['Tranche horaire'] == tranche_horaire)
    ]['Somme de Montants'].mean()
    
    if greve_en_cours:
        affluence_predite = affluence_moyenne * 0.7  # Réduction de 30% pendant les grèves
    else:
        affluence_predite = affluence_moyenne
    
    # Seuil de saturation (Q3 des données historiques)
    seuil_saturation = voyageurs['Somme de Montants'].quantile(0.75)
    
    # Calcul de la probabilité de saturation
    proba_saturation = min(100, max(0, (affluence_predite / seuil_saturation) * 100))
    
    # Affichage des résultats
    st.subheader("Résultats de la Simulation")
    
    col_res1, col_res2 = st.columns(2)
    
    with col_res1:
        st.metric("Affluence prédite", f"{int(affluence_predite):,} voyageurs")
    
    with col_res2:
        st.metric("Probabilité de saturation", f"{proba_saturation:.0f}%")
    
    # Recommandations
    st.subheader("Recommandations")
    if proba_saturation > 70:
        st.warning("Fort risque de saturation. Recommandations:")
        st.markdown("- Éviter cette gare pendant cette tranche horaire")
        st.markdown("- Privilégier les transports alternatifs")
    else:
        st.success("Affluence normale. Aucune restriction particulière.")