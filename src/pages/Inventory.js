import React, { useState, useContext, useEffect } from "react";

import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import Container from "@material-ui/core/Container";
import Pagination from "@material-ui/lab/Pagination";

import EmptyContainer from "../components/shared/UI/EmptyContainer";
import FilterForm from "../components/shared/form/FilterForm";
import ListingTable from "../components/shared/UI/ListingTable";
import Loading from "../components/shared/UI/Loading";
import ModalTemplate from "../components/shared/UI/ModalTemplate";
import PageTitle from "../components/shared/UI/PageTitle";
import ViewProduct from "../components/inventory/ViewProduct";

import { AuthContext } from "../context/auth-context";

import { useHttpClient } from "../hooks/http-hook";

const sortFields = [
	{ value: "createddate", label: "Created Date" },
	{ value: "updateddate", label: "Last Updated" },
	{ value: "name", label: "Name" },
	{ value: "category", label: "Category" },
	{ value: "code", label: "Code" },
	{ value: "quantity", label: "Quantity" },
];

const tableHeaders = [
	{ id: "code", label: "Product Code" },
	{ id: "name", label: "Product Name" },
	{ id: "category", label: "Category" },
	{ id: "quantity", label: "Current quantity" },
	{ id: "unit", label: "Unit" },
	{ id: "actions", label: "", minWidth: 5 },
];

const optionMenu = [
	{
		id: "view",
		label: "View",
		activateIn: ["ACTIVE", "INACTIVE"],
		modalConfig: {
			top: 20,
			left: 200,
			width: 1000,
			title: "View Inventory",
			icon: (
				<AssignmentTurnedInIcon
					style={{ fontSize: "30px", marginRight: "8px" }}
					color="primary"
				/>
			),
		},
	},
];

const viewInventoryModal = {
	operation: "view",
	top: 20,
	left: 200,
	width: 1000,
	title: "View Product",
	icon: (
		<AssignmentTurnedInIcon
			style={{ fontSize: "30px", marginRight: "8px" }}
			color="primary"
		/>
	),
};

const Inventory = () => {
	const auth = useContext(AuthContext);

	const { isLoading, httpErrors, sendRequest, clearError } = useHttpClient();

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
	const [modalConfig, setModalConfig] = useState(viewInventoryModal);

	const handleFilter = (filters) => {
		setFilter(filters);
	};

	const handlePage = (e, newPage) => {
		setPage(newPage);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
	};

	const handleModalConfig = (passedModalConfig) => {
		if (passedModalConfig.operation) {
			setModalConfig(passedModalConfig);
			setOpenModal(true);
		} else {
			setOpenModal(false);
		}
	};

	const inventoryBody = () => {
		switch (modalConfig.operation) {
			case "view":
				return <ViewProduct />;
		}
	};

	const loadProducts = async () => {
		let url = `${process.env.REACT_APP_URL_PREFIX}/api/inventory?sort=${filter.sort}&order=${filter.order}&limit=${filter.limit}&page=${page}`;

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
		loadProducts();
	}, [filter, page]);

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
				{inventoryBody()}
			</ModalTemplate>

			{/* Listing */}
			<Container>
				<PageTitle title="Inventory" />
				<FilterForm sort={sortFields} onHandleFilters={handleFilter} />
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
					<EmptyContainer message="No products found!" />
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

export default Inventory;
