const getStatusColor = (status) => {
        switch (status) {
            case 'Awaiting Manager Approval (Lv1)':
                return 'warning';
            case 'Awaiting Finance Approval (Lv2)':
                return 'info';
            case 'Fully Approved':
                return 'success';
            case 'Rejected':
                return 'danger';
            default:
                return 'secondary';
        }
    };

export default getStatusColor;