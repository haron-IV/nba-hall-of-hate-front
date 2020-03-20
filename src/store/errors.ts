const errors = {
    error: {
        isVisible: false
    }
};

const showError = (state: any) => {
    state.errors.error.isVisible = true;
};

const hideError = (state: any) => {
    state.errors.error.isVisible = false;
}

export { errors, showError, hideError };