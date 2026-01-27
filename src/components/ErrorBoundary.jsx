import { Component } from 'react'
import { Icon } from '@iconify/react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#000' }}>
          <div className="text-center max-w-md">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ backgroundColor: '#ef444420' }}
            >
              <Icon icon="ph:warning-circle-bold" className="w-10 h-10" style={{ color: '#ef4444' }} />
            </div>
            <h1 className="text-2xl font-bold mb-4" style={{ color: '#F5F5DC' }}>
              Something went wrong
            </h1>
            <p className="mb-8" style={{ color: '#B8A480' }}>
              An unexpected error occurred. Please try refreshing the page or return to the homepage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#141414', color: '#F5F5DC', border: '1px solid #3d3525' }}
              >
                <Icon icon="ph:arrow-clockwise-bold" className="w-5 h-5 inline mr-2" />
                Refresh Page
              </button>
              <button
                onClick={this.handleReset}
                className="px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: '#C5A059', color: '#000' }}
              >
                <Icon icon="ph:house-bold" className="w-5 h-5 inline mr-2" />
                Go Home
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
