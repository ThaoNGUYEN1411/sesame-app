"use client";
import axios, { all } from "axios";
import React, { useEffect, useState } from "react";

const Article = () => {
	const [listArticles, setListArticles] = useState([]);

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
					<div className="article">
						<h2>{elm.article.title}</h2>
						<img src={elm.article.image} alt={elm.article.title} />
						<p>{elm.article.description}</p>
					</div>
				);
			})}
		</div>
	);
};

export default Article;
