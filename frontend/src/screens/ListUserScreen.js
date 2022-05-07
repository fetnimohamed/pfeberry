import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, listUsers } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_DELETE_RESET } from "../constants/userConstants";

import AppDataGrid from "../components/tables/AppDataGrid";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
export default function ListUserScreen(props) {
  const { onCellClick } = props;

  const userList = useSelector((state) => state.userList);
  const {
    loading,
    error,
    users,
    pages,
    pageNumber: customerPageNumber,
    pageSize: customerPageSize,
  } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = userDelete;

  const dispatch = useDispatch();
  useEffect(() => {
    if (successDelete) {
      dispatch({ type: USER_DELETE_RESET });
    }

    dispatch(
      listUsers({
        name: "",
        pageNumber: 1,
        pageSize: 10,
      })
    );
  }, [dispatch, successDelete]);

  const deleteHandler = (userId) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteUser(userId));
    }
  };

  const searchHandler = (e) => {
    dispatch(
      listUsers({
        name: e.target.value,
        pageNumber: 1,
        pageSize: 10,
      })
    );
  };

  const usersHeadCells = [
    {
      field: "_id",
      headerName: "id",
      hide: true,
      type: "string",
    },
    {
      field: "name",
      headerName: "NAME",
      width: 300,
      type: "string",
      headerClassName: "headeritem",
    },
    {
      field: "email",
      headerName: "EMAIL",
      width: 300,
      type: "string",
      headerClassName: "headeritem",
    },
    {
      field: "isSuperAdmin",
      headerName: "Super Admin",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
      renderCell: (params) => {
        return (
          <div className="rowitem">
            {params.row.isSuperAdmin ? "YES" : "NO"}
          </div>
        );
      },
    },
    {
      field: "isAdmin",
      headerName: "Admin",
      flex: 1,
      type: "string",
      headerClassName: "headeritem",
      renderCell: (params) => {
        return (
          <div className="rowitem">{params.row.isAdmin ? "YES" : "NO"}</div>
        );
      },
    },
    {
      field: "action",
      headerName: "ACTIONS",
      type: "number",
      width: 180,
      headerClassName: "headeritem",

      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/${params.row._id}/edit`}>
              <button className="itemListEdit">Edit</button>
            </Link>
            <DeleteOutlineIcon
              className="itemListDelete"
              onClick={() => deleteHandler(params.row._id)}
              style={{ fontSize: 30 }}
            />
          </>
        );
      },
    },
  ];

  const createHandler = (params) => {
    props.history && props.history.push(`/register`);
  };

  return (
    <div>
      <div className="row">
        <div className="row">
          <h1>Users : </h1>
          <input
            type="search"
            id="user"
            onChange={(e) => {
              searchHandler(e);
            }}
            placeholder="User Name"
            autoComplete="off"
          />
        </div>
        <button type="button" className="addButton" onClick={createHandler}>
          Ajouter Utilisateur
        </button>
      </div>
      {loadingDelete && <LoadingBox></LoadingBox>}
      {errorDelete && <MessageBox variant="danger">{errorDelete} </MessageBox>}
      {successDelete && (
        <MessageBox variant="success">user deleted Succufaly</MessageBox>
      )}
      {error ? (
        <MessageBox variant="danger">{error} </MessageBox>
      ) : (
        <AppDataGrid
          columns={usersHeadCells}
          tableRows={users}
          page={Number(customerPageNumber - 1)}
          pageSize={Number(customerPageSize)}
          rowCount={Number(pages)}
          loading={loading}
          onCellClick={(data) => {
            onCellClick && onCellClick(data.row);
          }}
          onPageChange={(data) => {
            dispatch(
              listUsers({
                pageNumber: data.page + 1,
                pageSize: data.pageSize,
              })
            );
          }}
          onPageSizeChange={(data) => {
            dispatch(
              listUsers({
                pageNumber: 1,
                pageSize: data.pageSize,
              })
            );
          }}
        />
      )}
    </div>
  );
}
