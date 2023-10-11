import '@testing-library/jest-dom/extend-expect';
import { configure } from '@testing-library/react';

// This script is executed before every test run

// Configure react-testing-library
configure({ testIdAttribute: 'data-tid' });
