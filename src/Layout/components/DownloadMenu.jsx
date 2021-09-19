import React, { useState } from 'react';
import { Menu, MenuItem, Box, IconButton, Tooltip } from '@material-ui/core';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { downloadHTMLElementAsPDF, downloadHTMLElementAsImage } from '~/utils';
import { useRecoilValue } from 'recoil';
import { cvRefState } from '~/CV/store';

const DownloadMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const cvElement = useRecoilValue(cvRefState);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box {...props}>
      <Tooltip title="Download CV">
        <IconButton onClick={handleClick} color="inherit">
          <SaveAltIcon />
        </IconButton>
      </Tooltip>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            downloadHTMLElementAsPDF(cvElement);
          }}
        >
          Download CV in PDF
        </MenuItem>
        <MenuItem
          onClick={() => {
            downloadHTMLElementAsImage(cvElement);
          }}
        >
          Download CV in PNG
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default DownloadMenu;
