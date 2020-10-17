import React from 'react';
import { shallow } from 'enzyme';
import CookiesNotification from './CookiesNotification';

it('renders without crashing', () => {
  shallow(<CookiesNotification />);
});
