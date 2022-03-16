import React, { useState, useContext, useEffect } from "react";
import moment from "moment";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";
import Container from "@material-ui/core/Container";
import EditIcon from "@material-ui/icons/Edit";
import Pagination from "@material-ui/lab/Pagination";
import VisibilityIcon from "@material-ui/icons/Visibility";

import CancelOrder from "../components/orders/CancelOrder";
import CreateOrder from "../components/orders/CreateOrder";
import EditOrder from "../components/orders/EditOrder";
import EmptyContainer from "../components/shared/UI/EmptyContainer";
import FilterForm from "../components/shared/form/FilterForm";
import ListingTable from "../components/shared/UI/ListingTable";
import Loading from "../components/shared/UI/Loading";
import ModalTemplate from "../components/shared/UI/ModalTemplate";
import PageTitle from "../components/shared/UI/PageTitle";
import SnackbarTemplate from "../components/shared/UI/SnackbarTemplate";
import ViewOrder from "../components/orders/ViewOrder";

import { AuthContext } from "../context/auth-context";

import { useHttpClient } from "../hooks/http-hook";

const sortFields = [
	{ value: "createddate", label: "Created Date" },
	{ value: "updateddate", label: "Last Updated" },
	{ value: "pono", label: "Order Number" },
	{ value: "status", label: "Status" },
	{ value: "customer", label: "Customer" },
	{ value: "totalprice", label: "Total Amount" },
	{ value: "totalproducts", label: "Products Bought" },
];

const tableHeaders = [
	{ id: "poNo", label: "Order Number", minWidth: 100 },
	{ id: "customer", label: "Customer Name", minWidth: 100 },
	{ id: "totalProducts", label: "Number of products" },
	{ id: "totalPrice", label: "Total Amount" },
	{ id: "credit", label: "Credit" },
	{ id: "totalReturnedPrice", label: "Total Price Returned" },
	{ id: "orderDate", label: "Order Date" },
	{ id: "status", label: "Status" },
	{ id: "actions", label: "", minWidth: 5 },
];

const optionMenu = [
	{
		id: "view",
		label: "View",
		activateIn: ["DRAFT", "SUBMIT", "CANCELLED"],
		modalConfig: {
			top: 20,
			left: 200,
			width: 1000,
			title: "View Order",
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
		activateIn: ["DRAFT", "SUBMIT"],
		modalConfig: {
			top: 20,
			left: 200,
			width: 1000,
			title: "Edit Order",
			icon: (
				<EditIcon
					style={{ fontSize: "30px", marginRight: "8px" }}
					color="primary"
				/>
			),
		},
	},
	{
		id: "cancel",
		label: "Cancel",
		activateIn: ["DRAFT"],
		modalConfig: {
			top: 170,
			left: 450,
			width: 500,
			title: "Cancel Order",
			icon: (
				<CancelIcon
					style={{ fontSize: "30px", marginRight: "8px" }}
					color="primary"
				/>
			),
		},
	},
];

const createOrderModal = {
	operation: "add",
	top: 20,
	left: 200,
	width: 1000,
	title: "Add Order",
	icon: (
		<AddIcon
			style={{ fontSize: "30px", marginRight: "8px" }}
			color="primary"
		/>
	),
};

const Orders = () => {
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
	const [modalConfig, setModalConfig] = useState(createOrderModal);

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

			loadOrders();
		}

		setOpenModal(false);
	};

	const handleModalConfigCreate = () => {
		setModalConfig(createOrderModal);
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

	const orderBody = () => {
		switch (modalConfig.operation) {
			case "add":
				return <CreateOrder onClose={handleCloseModal} />;
			case "view":
				return <ViewOrder />;
			case "edit":
				return <EditOrder onClose={handleCloseModal} />;
			case "cancel":
				return <CancelOrder onClose={handleCloseModal} />;
		}
	};

	const loadOrders = async () => {
		let url = `${process.env.REACT_APP_URL_PREFIX}/api/orders?sort=${filter.sort}&order=${filter.order}&limit=${filter.limit}&page=${page}`;

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
		loadOrders();
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
				{orderBody()}
			</ModalTemplate>

			{/* Listing */}
			<Container>
				<PageTitle title="Orders" />
				<FilterForm sort={sortFields} onHandleFilters={handleFilter} />
				<Button
					variant="contained"
					color="primary"
					style={{ marginTop: "15px" }}
					startIcon={<AddIcon />}
					onClick={handleModalConfigCreate}
				>
					Add Order
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
					<EmptyContainer message="No orders found!" />
				)}
				{!isLoading && !httpErrors && total > 0 && (
					<>
						<ListingTable
							headers={tableHeaders}
							data={list}
							page={page}
							availableMenu={optionMenu}
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

export default Orders;
