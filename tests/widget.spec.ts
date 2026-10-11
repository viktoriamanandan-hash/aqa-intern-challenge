import { test, expect } from '@playwright/test';
import {WidgetPage} from "./widget.page";

test.describe('Uchi.ru widget ', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({page}) => {
    widgetPage = new WidgetPage(page);

    // open uchi.ru main page
    await page.goto('/');

    // close cookies popup
    await page.locator('._UCHI_COOKIE__button:visible').first().click();
  });

  test('opens', async ({page}) => {
    await widgetPage.openWidget();

    await expect(widgetPage.getWidgetBody()).toBeVisible()
  });

  test('opens contacts section and display support article', async ({ page }) => {
    await widgetPage.openWidget();
  
    await page.locator('[data-test="button_all_articles"]').click();
  
    await page.getByRole('button', { name:'Контакты'}).click();
  
  
    await expect(
      widgetPage.getWidgetBody().getByText(
        'Как написать в службу поддержки?',
        { exact: true }
      )
    ).toBeVisible();
    
  });
  test('contacts section contains three articles', async ({ page }) => {
    await widgetPage.openWidget();
  
    await page.locator('[data-test="button_all_articles"]').click();
  
    await page.getByRole('button', { name: 'Контакты' }).click();
  
    await expect(
      widgetPage.getWidgetBody().getByText(
        'Как написать в службу поддержки?',
        { exact: true }
      )
    ).toBeVisible();
  
    await expect(
      widgetPage.getWidgetBody().getByText(
        'Как связаться с нами по вопросам сотрудничества?',
        { exact: true }
      )
    ).toBeVisible();
  
    await expect(
      widgetPage.getWidgetBody().getByText(
        'Как связаться с нами по вопросам трудоустройства?',
        { exact: true }
      )
    ).toBeVisible();
  });
});
