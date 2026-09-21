# Hack School 2026

A Wordle clone constructed for ACM Hack School 2026.

## Contribution Instructions

1. Fork the repo, and clone it into your local environment.
2. `git remote add upstream https://github.com/acmucsd/hackschool-fa26.git`
3. Push feature branches to your fork and PR them into the main repo.

## Frontend (Client) Setup

Create in project root: `npx create-next-app@latest client`

Run inside client directory:
`npm run dev`

Dependencies: `npm install canvas-confetti`

Run inside client directory: `npm run dev`

The runs the project on localhost:3000.

## Backend (Server) Setup

Run inside server directory: 
`npm start`

WIP!

## Frontend Architecture

    client/
    
        app/ -> the file router for our app
            globals.css -> .css styles for the app
            layout.tsx -> formatting which applies to all pages in the folder
            page.tsx -> the page which exists at [URL]/. Wrapper for our game.

        components/ -> contains TSX code for display
            Board/
                Board.tsx -> a vertical set of rows.
                Row.tsx -> a horizontal set of tiles.
                Tile.tsx -> a letter card with flipping and coloring.
            Keyboard/
                Board.tsx -> a vertical set of rows.
                Row.tsx -> a horizontal set of keys.
                Tile.tsx -> a key card which changes based on passed board state.
            Game.tsx -> main component for our game, organizes all components and logic
            Toast.tsx -> component for popup messages

        lib/ -> contains purely non-UI code files
            canvas-confetti.d.ts -> make confetti JS library TS-safe
            date.ts -> get today's date
            types.ts -> defines prop types which are used by multiple components
            wordList.ts -> list of possible solution words
            wordOfTheDay.ts -> chooses the solution word based on days since epoch