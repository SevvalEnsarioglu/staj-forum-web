import React from "react";
import { useParams } from "react-router-dom";

const ForumKonuSecimi: React.FC = () => {
    const { id } = useParams();

    return (
        <div className="page-container">
            <h1>Forum Konusu #{id}</h1>
            <p>Sayfa içeriği gelecek.</p>
        </div>
    );
};

export default ForumKonuSecimi;