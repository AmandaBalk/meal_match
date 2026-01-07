import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { LandingPage } from "./pages/LandingPage";
import { FilterPage } from "./pages/FilterPage";
import { SingleModeWrapper } from "./pages/SingleModeWrapper";
import { MealInfo } from "./pages/MealInfo";
import { Matches } from "./pages/Matches";
import { MultiplayerMode } from "./pages/MultiplayerMode";
import { MultiplayerMatches } from "./pages/MultiplayerMatches";

export const router = createBrowserRouter([{
    path: "/",
    element: <Layout/>,
    children: [
        {
            path: "/",
            element: <LandingPage/>
        },
         {
            path: "/filter",
            element: <FilterPage/>
        },
        {
            path: "/swipe",
            element: <SingleModeWrapper/>
        },
        {
            path: "/multiplayer",
            element: <MultiplayerMode/>
        },
        {
            path: "/recipe/:id",
            element: <MealInfo/>
        },
        {
            path: "/matches",
            element: <Matches/>
        },
        {
            path: "/multiplayer-matches",
            element: <MultiplayerMatches/>
        }
    ]
}])