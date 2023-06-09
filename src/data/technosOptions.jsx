/* eslint-disable import/no-absolute-path */
/* eslint-disable global-require */
// ? Données pour le select des technos dans la barre de filtres membres et projets

import html from '/images/technos/html.svg';
import css from '/images/technos/css.svg';
import javascript from '/images/technos/javascript.svg';
import react from '/images/technos/react.svg';
import ejs from '/images/technos/ejs.svg';
import github from '/images/technos/github.svg';
import graphql from '/images/technos/graphql.svg';
import insomnia from '/images/technos/insomnia.svg';
import nodejs from '/images/technos/nodejs.svg';
import postgresql from '/images/technos/postgresql.svg';
import redux from '/images/technos/redux.svg';
import sequelize from '/images/technos/sequelize.svg';
import strapi from '/images/technos/strapi.svg';
import typescript from '/images/technos/typescript.svg';
import vite from '/images/technos/vite.svg';
import vuejs from '/images/technos/vuejs.svg';

const technosOptions = [
  {
    value: 'html',
    label: 'HTML',
    icon: <img src={html} alt="html" width="20px" height="20px" />,
  },
  {
    value: 'css',
    label: 'CSS',
    icon: <img src={css} alt="css" width="20px" height="20px" />,
  },
  {
    value: 'javascript',
    label: 'JavaScript',
    icon: <img src={javascript} alt="javascript" width="20px" height="20px" />,
  },
  {
    value: 'react',
    label: 'React',
    icon: <img src={react} alt="react" width="20px" height="20px" />,
  },
  {
    value: 'ejs',
    label: 'EJS',
    icon: <img src={ejs} alt="ejs" width="20px" height="20px" />,
  },
  {
    value: 'github',
    label: 'GitHub',
    icon: <img src={github} alt="github" width="20px" height="20px" />,
  },
  {
    value: 'graphql',
    label: 'GraphQL',
    icon: <img src={graphql} alt="graphql" width="20px" height="20px" />,
  },
  {
    value: 'insomnia',
    label: 'Insomnia',
    icon: <img src={insomnia} alt="insomnia" width="20px" height="20px" />,
  },
  {
    value: 'nodejs',
    label: 'NodeJS',
    icon: <img src={nodejs} alt="nodejs" width="20px" height="20px" />,
  },
  {
    value: 'postgresql',
    label: 'PostgreSQL',
    icon: <img src={postgresql} alt="postgresql" width="20px" height="20px" />,
  },
  {
    value: 'redux',
    label: 'Redux',
    icon: <img src={redux} alt="redux" width="20px" height="20px" />,
  },
  {
    value: 'sequelize',
    label: 'Sequelize',
    icon: <img src={sequelize} alt="sequelize" width="20px" height="20px" />,
  },
  {
    value: 'strapi',
    label: 'Strapi',
    icon: <img src={strapi} alt="strapi" width="20px" height="20px" />,
  },
  {
    value: 'typescript',
    label: 'TypeScript',
    icon: <img src={typescript} alt="typescript" width="20px" height="20px" />,
  },
  {
    value: 'vite',
    label: 'Vite',
    icon: <img src={vite} alt="vite" width="20px" height="20px" />,
  },
  {
    value: 'vuejs',
    label: 'VueJS',
    icon: <img src={vuejs} alt="vuejs" width="20px" height="20px" />,
  },
];

export default technosOptions;
