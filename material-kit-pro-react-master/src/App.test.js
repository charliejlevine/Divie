import React from 'react';
import { shallow } from 'enzyme';
import ThemeProvider from '@material-ui/core';
import { createTheme } from 'src/theme';
import GoogleAnalytics from 'src/components/GoogleAnalytics';
import CookiesNotification from 'src/components/CookiesNotification';
import SettingsNotification from 'src/components/SettingsNotification';
import * as useSettings from 'src/hooks/useSettings';
import App from './App';

jest.mock('src/hooks/useSettings');

describe('<App /> component tests', () => {
  it('renders successfully', () => {
    shallow(<App />);
  });

  // TODO make this test work
  it.skip('renders ThemeProvider component with theme', () => {
    const wrapper = shallow(<App />);
    const { settings } = useSettings.default();
    const theme = createTheme(settings);
    const themeProvider = wrapper.find(ThemeProvider);
    expect(themeProvider.props().theme).toEqual(theme);
  });

  it('renders GoogleAnalytics component', () => {
    const wrapper = shallow(<App />);
    const child = <GoogleAnalytics />;
    expect(wrapper.contains(child)).toEqual(true);
  });

  it('renders CookiesNotification component', () => {
    const wrapper = shallow(<App />);
    const child = <CookiesNotification />;
    expect(wrapper.contains(child)).toEqual(true);
  });

  it('renders SettingsNotification component', () => {
    const wrapper = shallow(<App />);
    const child = <SettingsNotification />;
    expect(wrapper.contains(child)).toEqual(true);
  });
});
