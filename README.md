# MealMatch description

A recipe/meal discovery app where you swipe through meal ideas, either solo or with a friend in real-time. A match automatically saves the recipe info in localStorage for single user, and Firebase + localStorage for multiplayer, so that the user(s) can go back and view the recipes at a later time.

## Tech Stack

React, TypeScript, Vite, Tailwind CSS, Firebase, Spoonacular API

## Setup

npm install

Create `.env` with API key:

VITE_API_KEY=your_spoonacular_key
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_DATABASE_URL=your_firebase_url

## Features

- Solo swipe mode with favorites
- Multiplayer mode with real-time match detection
- Diet filters (Vegetarian, Vegan, Meat)
- Keyboard navigation
- Recipe details with ingredients & instructions
