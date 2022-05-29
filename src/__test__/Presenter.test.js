import { Model } from '../Model/Model';
import { View } from '../View/View';
import { Presenter } from '../Presenter/Presenter';
import { ObserverTypes } from '../const';

describe('Presenter class:', () => {
  let model;
  let view;
  let presenter;
  beforeEach(() => {
    model = new Model();
    const modelOptions = model.getOptions();
    const element = document.createElement('div');
    view = new View(element, modelOptions);
    presenter = new Presenter(model, view);
  });

  test('must return an model instance', () => {
    expect(presenter.getModelInstance()).toBeInstanceOf(Model);
  });

  test('must return an view instance', () => {
    expect(presenter.getViewInstance()).toBeInstanceOf(View);
  });

  test('should subscribe to model', () => {
    const spyPresenterBind = jest.spyOn(presenter, 'bind');
    const spyModelSubscribe = jest.spyOn(model, 'subscribe');
    expect(spyPresenterBind).not.toHaveBeenCalled();
    expect(spyModelSubscribe).not.toHaveBeenCalled();
    presenter.bind();
    expect(spyPresenterBind).toHaveBeenCalledTimes(1);
    expect(spyModelSubscribe).toHaveBeenCalled();
  });

  test('should subscribe to view', () => {
    const spyPresenterBind = jest.spyOn(presenter, 'bind');
    const spyViewSubscribe = jest.spyOn(view, 'subscribe');
    expect(spyPresenterBind).not.toHaveBeenCalled();
    expect(spyViewSubscribe).not.toHaveBeenCalled();
    presenter.bind();
    expect(spyPresenterBind).toHaveBeenCalledTimes(1);
    expect(spyViewSubscribe).toHaveBeenCalled();
  });

  test('should call updateOptions method by view if model updated', () => {
    const spy = jest.spyOn(view, 'updateOptions');
    expect(spy).not.toHaveBeenCalled();
    model.updateOptions({});
    expect(spy).toHaveBeenCalled();
  });

  test('should call updateValue method by model if view change', () => {
    const spy = jest.spyOn(model, 'updateValue');
    expect(spy).not.toHaveBeenCalled();
    view.notify(ObserverTypes.UPDATE_VALUE, { value: 5, index: 0 });
    expect(spy).toHaveBeenCalled();
  });

  test('should call updateValue method by view if model value change', () => {
    const spy = jest.spyOn(view, 'updateValue');
    expect(spy).not.toHaveBeenCalled();
    model.updateValue({ value: 5, index: 0 });
    expect(spy).toHaveBeenCalled();
  });
});
