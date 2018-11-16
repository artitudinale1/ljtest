import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { lighten } from "@material-ui/core/styles/colorManipulator";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { store } from "../utils";
import { assetsActions } from "../actions";

const AssetsTableRow = (asset, index, ...props) => {
  const isSelected = asset.selected;
  const assetVals = asset.asset.asset.asset;
  const assetId = assetVals.id;

  return (
    <TableRow key={index}>
      <TableCell>{assetVals.name}</TableCell>
      <TableCell>{assetVals.units.join(", ")}</TableCell>
      <TableCell>{assetVals.technology}</TableCell>
      <TableCell>{assetVals.owl}</TableCell>
    </TableRow>
  );
};

const tableStyles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

const AssetsTable = ({ assets, ...props }) => {
  const { classes } = props;
  console.log(assets);
  const visibleAssets = assets.filter(a => a.visability);
  console.log(visibleAssets);
  const tableRows = visibleAssets.map((a, i) => (
    <AssetsTableRow asset={a} index={i} />
  ));

  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Asset ID</TableCell>
            <TableCell>Unit</TableCell>
            <TableCell>Technology</TableCell>
            <TableCell>Owl Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{tableRows}</TableBody>
      </Table>
    </Paper>
  );
};

const mapStateToProps = state => {
  const { assets } = state;
  return { assets: assets.assets };
};

// const connectedAssetsTable = connect(mapStateToProps)(withStyles(AssetsTable));
const connectedAssetsTable = connect(mapStateToProps)(AssetsTable);

export default connectedAssetsTable;
