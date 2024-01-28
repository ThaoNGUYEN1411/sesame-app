"use client";
import axios, { all } from "axios";
import React, { useEffect, useState } from "react";

const Article = () => {
	const [listArticles, setListArticles] = useState([]);

	// useEffect(() => {
	// 	// récupérer tous les étudiants

	// 	getArticles().then((data) => {
	// 		setListArticles(data.results[0].data.articles);
	// 		console.log(data.results[0].data.articles);
	// 	});
	// 	console.log(litsArticles);
	// }, []);

	// const getArticles = async () => {
	// 	// configurer la requête HTTP
	// 	const requestInfos = new Request(
	// 		"https://cdn.builder.io/api/v3/content/articles?apiKey=6e139f4f71454a88b3f01ee85b1a35b5",
	// 		{
	// 			method: "get",
	// 		},
	// 	);

	// 	// executer la requête HTTP
	// 	const request = await fetch(requestInfos);

	// 	// récupérer la réponse HTTP
	// 	const response = await request.json();

	// 	// renvoyer la réponse
	// 	return response;
	// };

	useEffect(() => {
		getAllArticles();
	}, []);

	const getAllArticles = () => {
		axios
			.get(
				"https://cdn.builder.io/api/v3/content/articles?apiKey=6e139f4f71454a88b3f01ee85b1a35b5",
			)
			.then((response) => {
				const allArticles = response.data.results[0].data.articles;
				setListArticles(allArticles);
			})
			.catch((error) => console.log("error", error));
	};

	console.log("listArticles", listArticles);
	return (
		<div>
			{listArticles?.map((elm) => {
				console.log("elm", elm);
				return (
					<>
						<h1>info</h1>
						<h2>{elm.article.title}</h2>
						<img src={elm.article.image} alt={elm.article.title} />
						<p>{elm.article.description}</p>
					</>
				);
			})}
		</div>
	);
};

export default Article;
