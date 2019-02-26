import {browser, protractor} from 'protractor';
import {TodoPage} from './todo-list.po';

let origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function () {
  let args = arguments;

  // queue 10ms wait between test
  //This delay is only put here so that you can watch the browser do its' thing.
  //If you're tired of it taking long you can remove this call
  origFn.call(browser.driver.controlFlow(), function () {
    return protractor.promise.delayed(10);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

describe('Todo List', () => {
  let page: TodoPage;

  beforeEach(() => {
    page = new TodoPage();
  });

  it('should get the Todos Page', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('Todos');
  });

  it('should filter todos', () => {
    page.navigateTo();
    page.type("Fry", "todoOwner");
    expect(page.elementIdExists("58895985a22c04e761776d54")).toBe(false);
    expect(page.elementIdExists("58895985c1849992336c219b")).toBe(true);
    page.type("in", "todoBody");
    expect(page.elementIdExists("58895985ae3b752b124e7663")).toBe(true);
    expect(page.elementIdExists("58895985c1849992336c219b")).toBe(false);
  });
});
