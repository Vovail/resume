import React, { useRef, useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import Editor from 'jsoneditor';
import { Box, Button, makeStyles } from '@material-ui/core';
import 'jsoneditor/dist/jsoneditor.css';

const useStyles = makeStyles(({ spacing }) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%'
  },
  editorContainer: {
    flex: 1,
    marginBottom: spacing(2)
  },
  submitButton: {
    alignSelf: 'baseline'
  }
}));

const JSONEditor = ({ value, onSubmit }) => {
  const classes = useStyles();
  const refContainer = useRef(null);
  const refEditor = useRef(null);
  const [errors, setErrors] = useState([]);

  const submitChanges = useCallback(() => {
    if (refEditor.current) {
      onSubmit(refEditor.current.get());
    }
  }, [refEditor.current, onSubmit])

  useEffect(() => {
    if (refContainer.current) {
      if (!refEditor.current) {
        refEditor.current = new Editor(refContainer.current,
          {
            mode: 'code',
            onValidationError: (errors) => {
              setErrors(errors);
              console.log(errors);
            }
          }
        );
      }
      // trick to set photo as a last property in JSON editor
      const { photo, position, summary, secondName, firstName, experience,  ...rest } = value;
      refEditor.current.set({ 
        firstName, secondName, position, summary, experience, ...rest, photo 
      });
    }
  }, [value])

  return <Box className={classes.wrapper}>
    <div ref={refContainer} className={classes.editorContainer} />
    <Button
      disabled={!!errors.length}
      className={classes.submitButton}
      size="small"
      variant="outlined"
      onClick={submitChanges}
    >
      Submit Changes
    </Button>
  </Box>

}

JSONEditor.propTypes = {
  value: PropTypes.object,
  onSubmit: PropTypes.func,
}

JSONEditor.defaultProps = {
  value: {},
  onSubmit: (data) => { console.log(data) },
}

export default React.memo(JSONEditor);