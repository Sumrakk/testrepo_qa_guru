import { test, expect } from "@playwright/test";

import { MainPage, RegisterPage, ProfilePage, EditorPage, ArticlePage} from "./pages/index";
import { faker } from "@faker-js/faker";

const URL = 'https://realworld.qa.guru';

test.describe('Авторизация',() => {
    test.beforeEach(async({page}) => {
        await page.goto(URL);
        
        const mainPage = new MainPage(page);
        const registerPage = new RegisterPage(page);

        await mainPage.gotoLogin();
        await registerPage.login();
    });

    test ('Создание поста', async({
        page,
    }) => {
        const post = {
            title:faker.word.words(1),
            description:faker.internet.emoji(),
            text:faker.word.words(15),
            tags:faker.word.words(1)
        };

        const mainPage = new MainPage(page);
        const editorPage = new EditorPage(page);

        await mainPage.gotoCreatePost();
        await editorPage.createPost(post);
        await page.waitForURL(URL + '/#/article/' + post.title);
        await expect(page.getByRole('heading')).toContainText(post.title);
        await expect(page.getByRole('paragraph')).toContainText(post.text);
    });

    test ('Создание коммента', async({
        page,
    }) => {
        const comment = faker.word.words(1)
        
        const mainPage = new MainPage(page);
        const articlePage = new ArticlePage(page);

        await mainPage.gotoGlobalPosts();
        await mainPage.gotoFirstPost();
        await articlePage.createComment(comment);
        await expect(page.getByRole('main')).toContainText(comment);
    });

    test ('Редактирование поста', async({
        page,
    }) => {
        const post = {
            title:faker.word.words(1),
            description:faker.internet.emoji(),
            text:faker.word.words(15),
            tags:faker.word.words(1)
        };

        const mainPage = new MainPage(page);
        const editorPage = new EditorPage(page);
        const articlePage = new ArticlePage(page);

        await mainPage.gotoProfile();
        await mainPage.gotoFirstPost();
        await articlePage.editPostBut();
        await editorPage.editPost(post);
        await expect(page.getByRole('heading')).toContainText(post.title);
        await expect(page.getByRole('main')).toContainText(post.text);
    });
/* Хотел сначала сделать тест на удаление поста, но столкнулся с трудностью со всплывающем окном, как правильно реализовать метод
   позволяющий работать с такими окнами подтверждения в браузере?
    test ('Удаление поста', async({
        page,
    }) => {

        const mainPage = new MainPage(page);
        const articlePage = new ArticlePage(page);

        await mainPage.gotoProfile();
        await mainPage.gotoFirstPost();
        await articlePage.deletePost();
        page.on('dialog', dialog => {
        console.log('Диалог:', dialog.message());
        dialog.accept();
        });
        

    });
*/
    test ('Переход по ссылке на Source Code', async({
        page,
    }) => {
              
        const mainPage = new MainPage(page);
        const profilePage = new ProfilePage(page);

        await mainPage.gotoSourceCode();
        await page.waitForURL('https://github.com/TonyMckes/conduit-realworld-example-app');
        

    });

    test ('Редактирование информации пользователя', async({
        page,
    }) => {
        const user = { 
            photoURL:faker.image.avatar(),
            name:faker.internet.displayName(),
            bio:faker.word.words(15),
        };
        

        const mainPage = new MainPage(page);
        const profilePage = new ProfilePage(page);

        await mainPage.gotoProfile();
        await mainPage.gotoProfileSettings();
        await profilePage.update(user)
    });
});
