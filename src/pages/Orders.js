import React, { useState } from "react";
import moment from "moment";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";
import Container from "@material-ui/core/Container";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";

import CancelOrder from "../components/orders/CancelOrder";
import CreateOrder from "../components/orders/CreateOrder";
import EditOrder from "../components/orders/EditOrder";
import FilterForm from "../components/shared/form/FilterForm";
import ListingTable from "../components/shared/UI/ListingTable";
import ModalTemplate from "../components/shared/UI/ModalTemplate";
import PageTitle from "../components/shared/UI/PageTitle";
import ViewOrder from "../components/orders/ViewOrder";

const DUMMY_ROWS = [
	{
		poNo: "PONO202202-0001",
		customer: "TEST1 TESTL1",
		totalProducts: 20,
		totalPrice: 200,
		totalReturnedPrice: 0,
		credit: 0,
		orderDate: moment("2022-02-18T15:49:04.781Z").format(
			"MMMM Do YYYY, h:mm:ss a"
		),
		status: "SUBMIT",
	},
	{
		poNo: "PONO202202-0002",
		customer: "TEST2 TESTL2",
		totalProducts: 20,
		totalPrice: 200,
		totalReturnedPrice: 0,
		credit: 0,
		orderDate: moment("2022-02-18T15:49:04.781Z").format(
			"MMMM Do YYYY, h:mm:ss a"
		),
		status: "SUBMIT",
	},
	{
		poNo: "PONO202202-0003",
		customer: "TEST3 TESTL3",
		totalProducts: 20,
		totalPrice: 200,
		totalReturnedPrice: 0,
		credit: 0,
		orderDate: moment("2022-02-18T15:49:04.781Z").format(
			"MMMM Do YYYY, h:mm:ss a"
		),
		status: "DRAFT",
	},
	{
		poNo: "PONO202202-0004",
		customer: "TEST4 TESTL4",
		totalProducts: 20,
		totalPrice: 200,
		totalReturnedPrice: 0,
		credit: 0,
		orderDate: moment("2022-02-18T15:49:04.781Z").format(
			"MMMM Do YYYY, h:mm:ss a"
		),
		status: "CANCELLED",
	},
	{
		poNo: "PONO202202-0005",
		customer: "TEST5 TESTL5",
		totalProducts: 20,
		totalPrice: 200,
		totalReturnedPrice: 0,
		credit: 0,
		orderDate: moment("2022-02-18T15:49:04.781Z").format(
			"MMMM Do YYYY, h:mm:ss a"
		),
		status: "DRAFT",
	},
	{
		poNo: "PONO202202-0006",
		customer: "TEST6 TESTL6",
		totalProducts: 20,
		totalPrice: 200,
		totalReturnedPrice: 0,
		credit: 1,
		orderDate: moment("2022-02-18T15:49:04.781Z").format(
			"MMMM Do YYYY, h:mm:ss a"
		),
		status: "SUBMIT",
	},
];

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
	{ id: "poNo", label: "Order Number", minWidth: 150 },
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
	const [filter, setFilter] = useState({});
	const [limit, setLimit] = useState(1);
	const [page, setPage] = useState(1);
	const [openModal, setOpenModal] = useState(false);
	const [modalConfig, setModalConfig] = useState(createOrderModal);

	const handleFilter = (filters) => {
		console.log(filters);
		setFilter(filters);
	};

	const handleLimit = (limit) => {
		setLimit(limit);
		setPage(1);
	};

	const handlePage = (page) => {
		setPage(page);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};

	const handleAddOrder = (newOrder) => {
		DUMMY_ROWS.push(newOrder);
		console.log(newOrder);
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
				return <CreateOrder onSave={handleAddOrder} />;
			case "view":
				return <ViewOrder />;
			case "edit":
				return <EditOrder />;
			case "cancel":
				return <CancelOrder onCancel={handleCloseModal} />;
		}
	};

	return (
		<>
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
				<ListingTable
					headers={tableHeaders}
					data={DUMMY_ROWS}
					limit={limit}
					page={page}
					availableMenu={optionMenu}
					onHandleLimit={handleLimit}
					onHandlePage={handlePage}
					onHandleModalConfig={handleModalConfig}
				/>
			</Container>
		</>
	);
};

export default Orders;
