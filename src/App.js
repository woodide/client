import React from "react";
import "./App.css";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import UserApp from "./app/UserApp";
import ProfessorApp from "./app/ProfessorApp";
import "bootstrap/dist/css/bootstrap.min.css";
import {ToastContainer, toast} from "react-toastify";
import {QueryClientProvider} from "react-query";
import queryClient from "./queries";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import {RecoilRoot} from "recoil";
import {ChakraProvider} from '@chakra-ui/react'

function App() {
    return (
        <RecoilRoot>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <ChakraProvider>
                        <Routes>
                            <Route path="/*" element={<UserApp/>}></Route>
                            <Route path="/professor/*" element={<ProfessorApp/>}></Route>
                        </Routes>
                        <ToastContainer/>
                    </ChakraProvider>
                </BrowserRouter>
            </QueryClientProvider>
        </RecoilRoot>
    );
}

export default App;
