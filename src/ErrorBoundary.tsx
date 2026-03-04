import React from 'react';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{ padding: 20, background: 'red', color: 'white', zIndex: 99999, position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                    <h1>Something went wrong.</h1>
                    <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error?.toString()}</pre>
                    <pre style={{ whiteSpace: 'pre-wrap', marginTop: 20 }}>{this.state.error?.stack}</pre>
                </div>
            );
        }

        return this.props.children;
    }
}
