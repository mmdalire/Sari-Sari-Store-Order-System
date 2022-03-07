import React, { useState, useContext, useEffect } from "react";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import AddIcon from "@material-ui/icons/Add";
import BlockIcon from "@material-ui/icons/Block";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Pagination from "@material-ui/lab/Pagination";
import VisibilityIcon from "@material-ui/icons/Visibility";

import BlacklistCustomer from "../components/customers/BlacklistCustomer";
import CreateCustomer from "../components/customers/CreateCustomer";
import DeleteCustomer from "../components/customers/DeleteCustomer";
import EditCustomer from "../components/customers/EditCustomer";
import EmptyContainer from "../components/shared/UI/EmptyContainer";
import FilterForm from "../components/shared/form/FilterForm";
import ListingTable from "../components/shared/UI/ListingTable";
import Loading from "../components/shared/UI/Loading";
import ModalTemplate from "../components/shared/UI/ModalTemplate";
import PageTitle from "../components/shared/UI/PageTitle";
import ReverseBlacklistCustomer from "../components/customers/ReverseBlacklistCustomer";
import SnackbarTemplate from "../components/shared/UI/SnackbarTemplate";
import ViewCustomer from "../components/customers/ViewCustomer";

import { AuthContext } from "../context/auth-context";

import { useHttpClient } from "../hooks/http-hook";

const sortFields = [
	{ value: "createddate", label: "Created Date" },
	{ value: "updateddate", label: "Last Updated" },
	{ value: "customerno", label: "Customer Number" },
	{ value: "lastname", label: "Lastname" },
	{ value: "firstname", label: "Firstname" },
	{ value: "isblacklisted", label: "Status" },
];

const tableHeaders = [
	{ id: "avatar", label: "Avatar" },
	{ id: "customerNo", label: "Customer Number" },
	{ id: "lastName", label: "Last Name", minWidth: 120 },
	{ id: "firstName", label: "First Name", minWidth: 150 },
	{ id: "middleInitial", label: "Middle Initial" },
	{ id: "status", label: "Status" },
	{ id: "actions", label: "", minWidth: 5 },
];

const optionMenus = [
	{
		id: "view",
		label: "View",
		activateIn: ["ACTIVE", "BLACKLISTED"],
		modalConfig: {
			top: 20,
			left: 200,
			width: 1000,
			title: "View Customer",
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
		activateIn: ["ACTIVE", "BLACKLISTED"],
		modalConfig: {
			top: 20,
			left: 310,
			width: 750,
			title: "Edit Customer",
			icon: (
				<EditIcon
					style={{ fontSize: "30px", marginRight: "8px" }}
					color="primary"
				/>
			),
		},
	},
	{
		id: "blacklist",
		label: "Blacklist customer",
		activateIn: ["ACTIVE"],
		modalConfig: {
			top: 170,
			left: 450,
			width: 500,
			title: "Blacklist Customer",
			icon: (
				<BlockIcon
					style={{ fontSize: "30px", marginRight: "8px" }}
					color="primary"
				/>
			),
		},
	},
	{
		id: "reverseBlacklist",
		label: "Reverse blacklist customer",
		activateIn: ["BLACKLISTED"],
		modalConfig: {
			top: 170,
			left: 450,
			width: 500,
			title: "Reverse Blacklist Customer",
			icon: (
				<AddCircleIcon
					style={{ fontSize: "30px", marginRight: "8px" }}
					color="primary"
				/>
			),
		},
	},
	{
		id: "delete",
		label: "Delete",
		activateIn: ["ACTIVE", "BLACKLISTED"],
		modalConfig: {
			top: 170,
			left: 450,
			width: 500,
			title: "Delete Customer",
			icon: (
				<DeleteIcon
					style={{ fontSize: "30px", marginRight: "8px" }}
					color="primary"
				/>
			),
		},
	},
];

const createCustomerModal = {
	operation: "add",
	top: 20,
	left: 310,
	width: 750,
	title: "Add Customer",
	icon: (
		<AddIcon
			style={{ fontSize: "30px", marginRight: "8px" }}
			color="primary"
		/>
	),
};

const Customers = () => {
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
	const [modalConfig, setModalConfig] = useState(createCustomerModal);

	const handleClearWarnings = () => {
		setWarnings(null);
	};

	const handleFilter = (filters) => {
		setFilter(filters);

		loadCustomers();
	};

	const handlePage = (e, newPage) => {
		setPage(newPage);
	};

	const handleCloseModal = (message = "") => {
		if (message) {
			setWarnings(message);

			loadCustomers();
		}

		setOpenModal(false);
	};

	const handleModalConfigCreate = () => {
		setModalConfig(createCustomerModal);
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

	const customerBody = () => {
		switch (modalConfig.operation) {
			case "add":
				return <CreateCustomer onClose={handleCloseModal} />;
			case "view":
				return <ViewCustomer />;
			case "edit":
				return <EditCustomer onClose={handleCloseModal} />;
			case "blacklist":
				return <BlacklistCustomer onClose={handleCloseModal} />;
			case "reverseBlacklist":
				return <ReverseBlacklistCustomer onClose={handleCloseModal} />;
			case "delete":
				return <DeleteCustomer onClose={handleCloseModal} />;
		}
	};

	const loadCustomers = async () => {
		let url = `${process.env.REACT_APP_URL_PREFIX}:${process.env.REACT_APP_PORT}/api/customers?sort=${filter.sort}&order=${filter.order}&limit=${filter.limit}&page=${page}`;

		//If there is a search keyword
		if (filter.search) {
			url = `${url}&search=${filter.search}`;
		}

		//If the filter specifies to only get the blacklisted ones
		if (filter.additional.isBlacklisted) {
			url = `${url}&isBlacklisted`;
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
		loadCustomers();
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
				{customerBody()}
			</ModalTemplate>

			{/* Listing */}
			<Container>
				<PageTitle title="Customers" />
				<FilterForm
					sort={sortFields}
					isBlacklisted
					onHandleFilters={handleFilter}
				/>
				<Button
					variant="contained"
					color="primary"
					style={{ marginTop: "15px" }}
					startIcon={<AddIcon />}
					onClick={handleModalConfigCreate}
				>
					Add Customer
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
					<EmptyContainer message="No customers found!" />
				)}
				{!isLoading && !httpErrors && total > 0 && (
					<>
						<ListingTable
							headers={tableHeaders}
							data={list}
							totalCount={total}
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

export default Customers;
