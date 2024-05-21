import React, {useState} from "react";
import './assets/styles/index.css';
import Article from "./components/Article";

export default function App() {
    // Стейт для хранения данных о статьях
    const [articles, setArticles] = useState([]);

    // Функция для добавления новой статьи
    const addNewArticle = (newArticle) => {
        setArticles(prevArticles => [...prevArticles, newArticle]); // Добавляем новую статью в массив статей
    };

    // Функция для архивирования статьи
    const handleArchive = (articleId) => {
        setArticles(prevArticles =>
            prevArticles.map(article =>
                article.id === articleId ? {...article, is_archived: true} : article // Изменяем статус архивирования для указанной статьи
            )
        );
    };

    // Функция для удаления статьи
    const handleDelete = (articleId) => {
        setArticles(prevArticles =>
            prevArticles.filter(article => article.id !== articleId) // Фильтруем статьи, оставляя только те, у которых ID не совпадает с указанным
        );
    };

    // Использование useState для управления состоянием формы
    const [formData, setFormData] = useState({
        author: "",
        title: "",
        category: "",
        content: ""
    });

    // Обработчик изменения значений в форме
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    // Обработчик отправки формы
    const handleForm = (event) => {
        event.preventDefault();
        // Создание новой записи с текущими значениями формы
        const newArticle = {
            id: Date.now(),
            is_archived: false,
            ...formData
        };
        // Вызов функции addNewArticle для добавления новой записи
        addNewArticle(newArticle);

        setFormData({
            author: "",
            title: "",
            category: "",
            content: ""
        });
    };

    return (
        <div>
            <header className="header">
                <h1 className="text">Блог</h1>
            </header>
            <div className="main-container">
                <main className="main">
                    <h2 className="main-title">Записи</h2>
                    <hr className="line"/>
                    <div className="articles-container">
                        {articles
                            .filter(article => !article.is_archived) // Фильтрация архивированных записей
                            .map(article => (
                                <Article
                                    key={article.id}
                                    id={article.id}
                                    title={article.title}
                                    category={article.category}
                                    author={article.author}
                                    content={article.content}
                                    onDelete={handleDelete}
                                    onArchive={handleArchive}
                                />
                            ))}
                    </div>
                </main>
                <aside className="aside">
                    <h2 className="aside-title">Создать запись</h2>
                    <hr className="line"/>

                    <form className="post-form" onSubmit={handleForm}>
                        <div className="author-input">
                            <label htmlFor="author">Автор</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="title-input">
                            <label htmlFor="title">Заголовок</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="category-input">
                            <label htmlFor="category">Категория</label>
                            <input
                                type="text"
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="content-input">
                            <label htmlFor="content">Содержание</label>
                            <textarea
                                id="content"
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                            />
                        </div>
                        <button type="submit" className="create-button">
                            Создать
                        </button>
                    </form>

                    <h2 className="aside-archive-title">Архив</h2>
                    <hr className="line"/>
                    <div className="aside-articles-container">
                        <ol>
                            {articles
                                .filter(article => article.is_archived)
                                .map(article => (
                                    <li key={article.id}>
                                        {article.title}
                                    </li>
                                ))}
                        </ol>
                    </div>
                </aside>
            </div>
            <footer className="footer">
                <h6 className="text">Курсовая работа по <strong>JS</strong>.</h6>
            </footer>
        </div>
    );
}
