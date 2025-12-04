import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { LandingPage } from "./pages/LandingPage";

export const router = createBrowserRouter([{
    path: "/",
    element: <Layout/>,
    children: [
        {
            path: "/",
            element: <LandingPage/>
        },
        // {
        //     path: "/matches",
        //     element: <Matches/>
        // },
        // {
        //     path: "/multiplayer",
        //     element: <MultiMode/>
        // },
        // {
        //     path: "/shared",
        //     element: <SharedMatches/>,
        // },
        // {
        //     path: "/singleplayer",
        //     element: <SingleMode/>
        // }
    ]
}])