import {browser, by, element, Key} from 'protractor';

export class TodoPage {
  navigateTo() {
    return browser.get('/todos');
  }

  highlightElement(byObject) {
    function setStyle(element, style) {
      const previous = element.getAttribute('style');
      element.setAttribute('style', style);
      setTimeout(() => {
        element.setAttribute('style', previous);
      }, 20);
      return "highlighted";
    }

    return browser.executeScript(setStyle, element(byObject).getWebElement(), 'color: red; background-color: yellow;');
  }

  getTitle() {
    let title = element(by.id('todo-list-title')).getText();
    this.highlightElement(by.id('todo-list-title'));
    return title;
  }

  type(input: string, fieldName: string){
    let field = element(by.id(fieldName));
    field.click();
    field.sendKeys(input);
  }

  elementIdExists(id: string){
    return element(by.id(id)).isPresent();
  }

  backspace(n: number){
    for(let i=0; i<n; i++) {
      browser.actions().sendKeys(Key.BACK_SPACE).perform();
    }
  }
}
