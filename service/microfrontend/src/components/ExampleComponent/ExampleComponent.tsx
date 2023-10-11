import { gql } from '../../__generated__';
import { ExampleComponentProps } from '@meisterplan/templaniantiger-wrapper';
import { MPTheme } from '@meisterplan/ui-react';
import { Typography } from '@mui/material';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme: MPTheme) => ({
  text: {
    color: theme.customTheme.colors.system.primaryColor,
  },
}));

export const ExampleComponent: React.FC<ExampleComponentProps> = (props) => {
  const { classes } = useStyles();
  //const { data } = useQuery(query);
  return (
    <div data-tid="example">
      <Typography className={classes.text}>
        <FormattedMessage id="hello" values={{ name: props.someProp }} />
      </Typography>
    </div>
  );
};

export const query = /* language=GraphQL */ gql(`
  query BlogPosts {
    tigerBlogPosts(first: 10) {
      edges {
        node {
          blogPostId
          text
        }
      }
    }
  }
`);
