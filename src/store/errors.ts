const errors = {
    error: {
        isVisible: false,
        content: null,
        status: null
    }
};

const showError = (state: any, message: String) => {
    state.errors.error.isVisible = true;
    state.errors.error.content = message;
};

const hideError = (state: any) => {
    state.errors.error.isVisible = false;
}

export { errors, showError, hideError };