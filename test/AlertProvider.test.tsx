import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AlertProvider, AlertContext } from '@/context/AlertContext';
import { AlertSeverity } from '@/types/alert';
import { useAlert } from '@/hooks/useAlert';

// Helper component to use the context
const TestComponent = () => {
    const { showAlert } = React.useContext(AlertContext) ?? {};

    return (
        <div>
            <button onClick={() => showAlert?.('Test message', AlertSeverity.Success)}>Show Alert</button>
        </div>
    );
};

describe('AlertProvider', () => {
    it('should render children', () => {
        render(
            <AlertProvider>
                <div>Child Component</div>
            </AlertProvider>
        );

        expect(screen.getByText('Child Component')).toBeInTheDocument();
    });

    it('should show an alert when showAlert is called', async () => {
        render(
            <AlertProvider>
                <TestComponent />
            </AlertProvider>
        );

        // Trigger the alert
        fireEvent.click(screen.getByText('Show Alert'));

        // Check if the Snackbar is visible
        expect(await screen.findByText('Test message')).toBeInTheDocument();
        expect(screen.getByRole('alert')).toHaveTextContent('Test message');
    });

    it('should handle missing context', () => {
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => { }); // Suppress React error

        const FailingComponent = () => {
            const { showAlert } = useAlert();
            showAlert?.('Test message', AlertSeverity.Success); // This should throw
            return null;
        };

        expect(() => render(<FailingComponent />)).toThrow('useAlert must be used within an AlertProvider');
        consoleErrorSpy.mockRestore();
    });
});
