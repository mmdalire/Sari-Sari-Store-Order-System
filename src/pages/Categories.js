import React, { useState, useContext, useEffect } from "react";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Pagination from "@material-ui/lab/Pagination";
import VisibilityIcon from "@material-ui/icons/Visibility";

import CreateCategory from "../components/categories/CreateCategory";
import DeleteCategory from "../components/categories/DeleteCategory";
import EditCategory from "../components/categories/EditCategory";
import EmptyContainer from "../components/shared/UI/EmptyContainer";
import FilterForm from "../components/shared/form/FilterForm";
import ListingTable from "../components/shared/UI/ListingTable";
import Loading from "../components/shared/UI/Loading";
import ModalTemplate from "../components/shared/UI/ModalTemplate";
import PageTitle from "../components/shared/UI/PageTitle";
import SnackbarTemplate from "../components/shared/UI/SnackbarTemplate";
import ViewCategory from "../components/categories/ViewCategory";

import { AuthContext } from "../context/auth-context";

import { useHttpClient } from "../hooks/http-hook";

const sortFields = [
	{ value: "createddate", label: "Created Date" },
	{ value: "updateddate", label: "Last Updated" },
	{ value: "name", label: "Name" },
	{ value: "code", label: "Code" },
];

const tableHeaders = [
	{ id: "code", label: "Category code" },
	{ id: "name", label: "Name" },
	{ id: "status", label: "Status" },
	{ id: "actions", label: "", minWidth: 5 },
];

const optionMenus = [
	{
		id: "view",
		label: "View",
		activateIn: ["IN-USE", "UNUSED"],
		modalConfig: {
			top: 20,
			left: 400,
			width: 600,
			title: "View Category",
			icon: (
				<VisibilityIcon
					style={{ fontSize: "30px", marginRight: "8px" }}
					color="primary"
				/>
			),
		},
	},
	{
		id: "edit",
		label: "Edit",
		activateIn: ["UNUSED"],
		modalConfig: {
			top: 170,
			left: 450,
			width: 500,
			title: "Edit Category",
			icon: (
				<EditIcon
					style={{ fontSize: "30px", marginRight: "8px" }}
					color="primary"
				/>
			),
		},
	},
	{
		id: "delete",
		label: "Delete",
		activateIn: ["UNUSED"],
		modalConfig: {
			top: 170,
			left: 450,
			width: 500,
			title: "Delete Category",
			icon: (
				<DeleteIcon
					style={{ fontSize: "30px", marginRight: "8px" }}
					color="primary"
				/>
			),
		},
	},
];

const createCategoryModal = {
	operation: "add",
	top: 170,
	left: 450,
	width: 500,
	title: "Add Category",
	icon: (
		<AddIcon
			style={{ fontSize: "30px", marginRight: "8px" }}
			color="primary"
		/>
	),
};

const Categories = () => {
	const auth = useContext(AuthContext);

	const { isLoading, httpErrors, sendRequest, clearError } = useHttpClient();

	const [warnings, setWarnings] = useState(null);
	const [filter, setFilter] = useState({
		search: "",
		sort: "createddate",
		order: "desc",
		limit: 10,
		additional: {
			isBlacklisted: false,
		},
	});
	const [page, setPage] = useState(1);
	const [total, setTotal] = useState(null);
	const [list, setList] = useState(null);
	const [openModal, setOpenModal] = useState(false);
	const [modalConfig, setModalConfig] = useState(createCategoryModal);

	const handleClearWarnings = () => {
		setWarnings(null);
	};

	const handleFilter = (filters) => {
		setFilter(filters);
	};

	const handlePage = (e, newPage) => {
		setPage(newPage);
	};

	const handleCloseModal = (message = "") => {
		if (message) {
			setWarnings(message);

			loadCategories();
		}

		setOpenModal(false);
	};

	const handleModalConfigCreate = () => {
		setModalConfig(createCategoryModal);
		setOpenModal(true);
	};

	const handleModalConfig = (passedModalConfig) => {
		if (passedModalConfig.operation) {
			setModalConfig(passedModalConfig);
			setOpenModal(true);
		} else {
			setOpenModal(false);
		}
	};

	const categoryBody = () => {
		switch (modalConfig.operation) {
			case "add":
				return <CreateCategory onClose={handleCloseModal} />;
			case "view":
				return <ViewCategory />;
			case "edit":
				return <EditCategory onClose={handleCloseModal} />;
			case "delete":
				return <DeleteCategory onClose={handleCloseModal} />;
		}
	};

	const loadCategories = async () => {
		let url = `${process.env.REACT_APP_URL_PREFIX}/api/categories?sort=${filter.sort}&order=${filter.order}&limit=${filter.limit}&page=${page}`;

		//If there is a search keyword
		if (filter.search) {
			url = `${url}&search=${filter.search}`;
		}

		try {
			clearError();

			const data = await sendRequest(url, "GET", null, {
				"Content-Type": "application/json",
				Authorization: `Bearer ${auth.token}`,
			});

			setList(data.data);
			setTotal(data.count);
		} catch (err) {}
	};

	const totalPages = total ? Math.ceil(total / filter.limit) : 0;

	useEffect(() => {
		loadCategories();
	}, [filter, page]);

	return (
		<>
			{/* Snackbars */}
			{warnings && (
				<SnackbarTemplate
					open={!!warnings}
					type="success"
					message={warnings}
					onHandleClose={handleClearWarnings}
				/>
			)}

			{/* Modals */}
			<ModalTemplate
				open={openModal}
				onClose={handleCloseModal}
				top={modalConfig.top}
				left={modalConfig.left}
				width={modalConfig.width}
				modalTitle={modalConfig.title}
				modalIcon={modalConfig.icon}
			>
				{categoryBody()}
			</ModalTemplate>
			{/* Listing */}
			<Container>
				<PageTitle title="Categories" />
				<FilterForm sort={sortFields} onHandleFilters={handleFilter} />
				<Button
					variant="contained"
					color="primary"
					style={{ marginTop: "15px" }}
					startIcon={<AddIcon />}
					onClick={handleModalConfigCreate}
				>
					Add Category
				</Button>
				{isLoading && <Loading />}
				{!isLoading && httpErrors && (
					<EmptyContainer
						message={
							httpErrors ||
							"Something went wrong. Please try again later."
						}
					/>
				)}
				{!isLoading && !httpErrors && total === 0 && (
					<EmptyContainer message="No categories found!" />
				)}
				{!isLoading && !httpErrors && total > 0 && (
					<>
						<ListingTable
							headers={tableHeaders}
							data={list}
							page={page}
							availableMenu={optionMenus}
							onHandlePage={handlePage}
							onHandleModalConfig={handleModalConfig}
						/>
						<div
							style={{
								display: "flex",
								width: "100%",
								justifyContent: "center",
								marginTop: 20,
							}}
						>
							<Pagination
								count={totalPages}
								color="primary"
								page={page}
								onChange={handlePage}
							/>
						</div>
					</>
				)}
			</Container>
		</>
	);
};

export default Categories;
