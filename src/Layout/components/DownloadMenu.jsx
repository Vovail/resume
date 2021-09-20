import React, { useState } from 'react';
import { Menu, MenuItem, Box, IconButton, Tooltip } from '@material-ui/core';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import { downloadHTMLElementAsPDF, downloadHTMLElementAsImage } from '~/utils';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cvRefState, isFileDownloadingState } from '~/CV/store';

const DownloadMenu = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const cvElement = useRecoilValue(cvRefState);
  const setIsFileDownloading = useSetRecoilState(isFileDownloadingState);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDownloadPDF = async () => {
    setIsFileDownloading(true);
    handleClose();
    await downloadHTMLElementAsPDF(cvElement);
    setIsFileDownloading(false);
  };

  const handleDownloadPNG = async () => {
    setIsFileDownloading(true);
    handleClose();
    await downloadHTMLElementAsImage(cvElement);
    setIsFileDownloading(false);
  };

  return (
    <Box {...props}>
      <Tooltip title="Download CV">
        <IconButton onClick={handleClick} color="inherit">
          <SaveAltIcon />
        </IconButton>
      </Tooltip>
      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={handleDownloadPDF}>Download CV in PDF</MenuItem>
        <MenuItem onClick={handleDownloadPNG}>Download CV in PNG</MenuItem>
      </Menu>
    </Box>
  );
};

export default DownloadMenu;
