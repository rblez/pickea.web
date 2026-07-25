let modalOpen = $state(false);

export function getModalOpen() {
	return modalOpen;
}

export function setModalOpen(value: boolean) {
	modalOpen = value;
}