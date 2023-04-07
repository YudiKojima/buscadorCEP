import { FiSearch } from "react-icons/fi";

import "./Styles.css";
import { useState } from "react";

import Api from "../services/Api";

function Input() {
    const [input, setInput] = useState("");
    const [cep, setCep] = useState({});

    async function handleSearch(e) {
        e.preventDefault();

        if (input === "") {
            alert("Preencha o campo!");
            return;
        }

        try {
            const response = await Api.get(`${input}/json`);
            setCep(response.data);
            setInput("");
        } catch {
            alert("CEP inválido");
            setInput("");
        }
    }

    async function handleKeyDown(e) {
        if (e.key === "Enter") {
            if (input === "") {
                alert("Preencha o campo!");
                return;
            }

            try {
                const response = await Api.get(`${input}/json`);
                setCep(response.data);
                setInput("");
            } catch {
                alert("CEP inválido");
                setInput("");
            }
        }
    }

    return (
        <div className="container">
            <h1 className="title">Buscador de CEP</h1>
            <p className="p">Pode digitar com traço ou sem traço!</p>
            <div className="containerInput">
                <input
                    type="text"
                    placeholder="Insira seu cep..."
                    value={input}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setInput(e.target.value)}
                />

                <button className="buttonSearch" onClick={handleSearch}>
                    <FiSearch size={25} color="#f2f2f2" />
                </button>
            </div>

            {Object.keys(cep).length > 0 && (
                <main className="main">
                    <h2>CEP : {cep.cep}</h2>
                    <span>{cep.logradouro}</span>
                    <span>Bairro: {cep.bairro}</span>
                    <span>
                        {cep.localidade} - {cep.uf}
                    </span>
                    <span>DDD: {cep.ddd}</span>
                </main>
            )}
        </div>
    );
}

export default Input;
