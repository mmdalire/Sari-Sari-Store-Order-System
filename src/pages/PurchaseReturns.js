import React, { useState } from "react";
import moment from "moment";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import VisibilityIcon from "@material-ui/icons/Visibility";

import CreatePurchaseReturn from "../components/purchase_returns/CreatePurchaseReturn";
import FilterForm from "../components/shared/form/FilterForm";
import ListingTable from "../components/shared/UI/ListingTable";
import ModalTemplate from "../components/shared/UI/ModalTemplate";
import PageTitle from "../components/shared/UI/PageTitle";
import ViewPurchaseReturn from "../components/purchase_returns/ViewPurchaseReturn";

const DUMMY_ROWS = [
	{
		prtNo: "PRTNO202202-0001",
		poNo: "PONO202202-0001",
		returnedTotalPrice: 1,
		returnedTotalQuantity: 10,
		returnDate: moment("2022-02-18T15:49:04.781Z").format(
			"MMMM Do YYYY, h:mm:ss a"
		),
	},
	{
		prtNo: "PRTNO202202-0002",
		poNo: "PONO202202-0001",
		returnedTotalPrice: 100,
		returnedTotalQuantity: 2,
		returnDate: moment("2022-02-18T15:49:04.781Z").format(
			"MMMM Do YYYY, h:mm:ss a"
		),
	},
	{
		prtNo: "PRTNO202202-0001",
		poNo: "PONO202202-0001",
		returnedTotalPrice: 1,
		returnedTotalQuantity: 10,
		returnDate: moment("2022-02-18T15:49:04.781Z").format(
			"MMMM Do YYYY, h:mm:ss a"
		),
	},
];

const sortFields = [
	{ value: "createddate", label: "Created Date" },
	{ value: "updateddate", label: "Last Updated" },
	{ value: "prtno", label: "Purchase Return Number" },
	{ value: "pono", label: "Order Number" },
	{ value: "returnedtotalprice", label: "Total Price Returned" },
	{ value: "returnedtotalquantity", label: "Total Quantity Returned" },
];

const tableHeaders = [
	{ id: "prtNo", label: "Purchase Return Number" },
	{ id: "poNo", label: "Order Number", minWidth: 150 },
	{ id: "returnedTotalPrice", label: "Total Price Returned" },
	{ id: "returnedTotalQuantity", label: "Total Quantity Returned" },
	{ id: "returnDate", label: "Return Date" },
	{ id: "actions", label: "", minWidth: 5 },
];

const optionMenu = [
	{
		id: "view",
		label: "View",
		activateIn: ["ACTIVE"],
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
];

const createPurchaseReturnModal = {
	operation: "add",
	top: 20,
	left: 200,
	width: 1000,
	title: "Add Purchase Return",
	icon: (
		<AddIcon
			style={{ fontSize: "30px", marginRight: "8px" }}
			color="primary"
		/>
	),
};

const PurchaseReturns = () => {
	const [filter, setFilter] = useState({});
	const [limit, setLimit] = useState(1);
	const [page, setPage] = useState(1);
	const [openModal, setOpenModal] = useState(false);
	const [modalConfig, setModalConfig] = useState(createPurchaseReturnModal);

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

	const handleAddPurchaseReturn = (newPurchaseReturn) => {
		DUMMY_ROWS.push(newPurchaseReturn);
		console.log(newPurchaseReturn);
		setOpenModal(false);
	};

	const handleModalConfigCreate = () => {
		setModalConfig(createPurchaseReturnModal);
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

	const purchaseReturnBody = () => {
		switch (modalConfig.operation) {
			case "add":
				return (
					<CreatePurchaseReturn onSave={handleAddPurchaseReturn} />
				);
			case "view":
				return <ViewPurchaseReturn />;
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
				{purchaseReturnBody()}
			</ModalTemplate>

			{/* Listing */}
			<Container>
				<PageTitle title="Purchase Returns" />
				<FilterForm sort={sortFields} onHandleFilters={handleFilter} />
				<Button
					variant="contained"
					color="primary"
					style={{ marginTop: "15px" }}
					startIcon={<AddIcon />}
					onClick={handleModalConfigCreate}
				>
					Add Purchase Return
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

export default PurchaseReturns;
