import React, { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import Moment from "react-moment";
import Layout from "../components/Layout";
import arrow from "../assests/arrow.svg";

const staticData = [
  {
    id: 1,
    title: "Food",
    cover: "https://via.placeholder.com/150",
    body: "This is a sample article body 1.",
    createdAt: "2023-10-01",
    category: "tech",
    author: "Dinesh reddy",
    likes: 10,
    views: 100,
  },
  {
    id: 2,
    title: "Beauty",
    cover: "https://via.placeholder.com/150",
    body: "This is a sample article body 2.",
    createdAt: "2023-09-20",
    category: "lifestyle",
    author: "Author 2",
    likes: 20,
    views: 200,
  },
  // Add more sample articles here
];

export default function Blog() {
  const { categoryid } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadmore, setLoadMore] = useState(false);
  const [page, setPage] = useState(0);

  const loadMore = () => {
    setPage((page) => page + 1);
    // Simulate loading more articles with static data
    const moreData = staticData.slice(page * 3, (page + 1) * 3);
    setData((data) => [...data, ...moreData]);
    setLoadMore(false);
  };

  useEffect(() => {
    setLoading(true);
    const initialData = staticData.slice(0, 3); // Load first 3 articles initially
    setData(initialData);
    setLoading(false);
  }, [categoryid]);

  return (
    <Layout>
      <div className="md:flex container md:mx-auto md:mt-10 mb-10 md:mb-40">
        <main className="container px-4">
          <h1 className="font-mont font-medium text-2xl mt-10 pb-4 border-orange-600 border-b-2 inline-block">
            {categoryid.toUpperCase()}
          </h1>

          {loading && (
            <div className="flex px-5 w-min mx-auto py-20 md:py-40">
              <svg
                className="animate-spin w-10 inline-block mr-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="inline-block text-3xl">Loading...</p>
            </div>
          )}

          {!loading &&
            data
              .filter((article) => article.category === categoryid)
              .map((e) => {
                return (
                  <article className="flex border-b py-10" key={e.id}>
                    <div className="flex w-4/5 md:w-1/3">
                      <img src={e.cover} className="md:max-w-xs" alt="" loading="lazy" />
                    </div>
                    <div className="ml-5 md:flex md:flex-col md:justify-between">
                      <h1 className="font-mont font-medium text-xl md:text-2xl lg:text-3xl md:w-2/3">
                        <NavLink
                          state={{
                            title: e.title,
                            cover: e.cover,
                            content: e.body,
                            likes: e.likes,
                            date: e.createdAt,
                            category: e.category,
                            author: e.author,
                            data: data,
                          }}
                          to={`article/${e.id}`}
                        >
                          {e.title}
                        </NavLink>
                      </h1>
                      <p className="pt-2 font-mont font-medium text-slate-400 md:w-3/4 lg:hidden">
                        {e.body.substring(0, 50)}
                      </p>
                      <p className="hidden pt-2 font-mont font-medium text-slate-400 lg:w-2/3 lg:text-xl lg:block">
                        {e.body.substring(0, 50)}
                      </p>
                      <p className="pt-2 font-mont font-medium text-slate-300">
                        <span className="text-slate-800 md:pr-3">{e.category}</span> /{" "}
                        <span className="md:pl-3">
                          <Moment format="D MMM YYYY">{e.createdAt}</Moment>
                        </span>
                      </p>
                    </div>
                  </article>
                );
              })}

          {loadmore && (
            <div className="flex px-5 w-min mx-auto py-20 md:py-40">
              <svg
                className="animate-spin w-10 inline-block mr-5 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <p className="inline-block text-3xl">Loading...</p>
            </div>
          )}

          {!loadmore && (
            <div className="flex mt-5">
              <img className="inline-block mr-4" src={arrow} alt="" />
              <button onClick={loadMore} className="uppercase inline-block text-slate-400">
                Load More
              </button>
            </div>
          )}
        </main>

        <aside className="container px-4 md:w-1/3">
          <h1 className="font-mont font-medium text-2xl mt-10 pb-4 border-orange-600 border-b-2 inline-block">
            Top Posts
          </h1>
          {!loading &&
            data.slice(0, 3).map((e) => {
              return (
                <article className="flex border-b py-10" key={e.id}>
                  <div className="flex w-2/3">
                    <img src={e.cover} alt="" />
                  </div>
                  <div className="ml-5">
                    <h1 className="font-mont font-medium text-xl">
                      <NavLink
                        state={{
                          title: e.title,
                          cover: e.cover,
                          content: e.body,
                          likes: e.likes,
                          date: e.createdAt,
                          category: e.category,
                          author: e.author,
                        }}
                        to={`article/${e.id}`}
                      >
                        {e.title}
                      </NavLink>
                    </h1>
                    <p className="pt-2 font-mont font-medium text-slate-300">
                      <span className="text-slate-800">{e.category}</span> /{" "}
                      <span>
                        <Moment format="D MMM YYYY">{e.createdAt}</Moment>
                      </span>
                    </p>
                  </div>
                </article>
              );
            })}
          <div className="w-full border border-black flex items-center justify-center h-1/4">
            <h1 className="text-2xl">Advertisment</h1>
          </div>
        </aside>
      </div>
    </Layout>
  );
}
