import React, { useState, useContext, useEffect } from "react";
import moment from "moment";

import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Pagination from "@material-ui/lab/Pagination";
import VisibilityIcon from "@material-ui/icons/Visibility";

import CreatePurchaseReturn from "../components/purchase_returns/CreatePurchaseReturn";
import EmptyContainer from "../components/shared/UI/EmptyContainer";
import FilterForm from "../components/shared/form/FilterForm";
import ListingTable from "../components/shared/UI/ListingTable";
import Loading from "../components/shared/UI/Loading";
import ModalTemplate from "../components/shared/UI/ModalTemplate";
import PageTitle from "../components/shared/UI/PageTitle";
import SnackbarTemplate from "../components/shared/UI/SnackbarTemplate";
import ViewPurchaseReturn from "../components/purchase_returns/ViewPurchaseReturn";

import { AuthContext } from "../context/auth-context";

import { useHttpClient } from "../hooks/http-hook";

const sortFields = [
	{ value: "createddate", label: "Created Date" },
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
	const [modalConfig, setModalConfig] = useState(createPurchaseReturnModal);

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

			loadPurchaseReturns();
		}

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
				return <CreatePurchaseReturn onClose={handleCloseModal} />;
			case "view":
				return <ViewPurchaseReturn />;
		}
	};

	const loadPurchaseReturns = async () => {
		let url = `${process.env.REACT_APP_URL_PREFIX}:${process.env.REACT_APP_PORT}/api/purchase_return?sort=${filter.sort}&order=${filter.order}&limit=${filter.limit}&page=${page}`;

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
		loadPurchaseReturns();
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
					<EmptyContainer message="No purchase returns found!" />
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

export default PurchaseReturns;
