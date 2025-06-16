// RomanBlindCalculator.js - Main calculator component
const RomanBlindCalculator = () => {
  const { useState } = React;
  
  // Get Lucide icons
  const { Calculator, Package, Ruler, ShoppingCart, Scissors } = lucideReact;

  const [units, setUnits] = useState('metric');
  const [useDualCalculator, setUseDualCalculator] = useState(false);
  const [width, setWidth] = useState(80);
  const [height, setHeight] = useState(160);
  const [fabricWidth, setFabricWidth] = useState(140);
  
  const [blinds, setBlinds] = useState([
    { width: 80, height: 160 },
    { width: 80, height: 160 }
  ]);

  return React.createElement('div', {
    className: "max-w-4xl mx-auto p-6 bg-white"
  }, [
    // Header
    React.createElement('div', {
      key: 'header',
      className: "mb-8 text-center"
    }, [
      React.createElement('h1', {
        key: 'title',
        className: "text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center gap-2"
      }, [
        React.createElement(Calculator, {
          key: 'calculator-icon',
          className: "text-blue-600",
          size: 24
        }),
        'Roman Blind Calculator'
      ]),
      React.createElement('p', {
        key: 'subtitle',
        className: "text-gray-600"
      }, 'Calculate fabric requirements with imperial feet & inches and yard purchasing')
    ]),

    // Calculator Mode Selection
    React.createElement('div', {
      key: 'mode-selection',
      className: "bg-slate-50 p-6 rounded-lg mb-8"
    }, [
      React.createElement('h2', {
        key: 'mode-title',
        className: "text-xl font-semibold mb-4"
      }, 'Calculator Mode'),
      React.createElement('div', {
        key: 'mode-controls',
        className: "flex flex-col sm:flex-row gap-4 items-start"
      }, [
        React.createElement('div', {
          key: 'mode-buttons',
          className: "flex gap-4"
        }, [
          React.createElement('button', {
            key: 'single-mode',
            onClick: () => setUseDualCalculator(false),
            className: `px-4 py-2 rounded-md transition-colors ${
              !useDualCalculator 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`
          }, 'Single Blind'),
          React.createElement('button', {
            key: 'multi-mode',
            onClick: () => setUseDualCalculator(true),
            className: `px-4 py-2 rounded-md transition-colors ${
              useDualCalculator 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`
          }, 'Multiple Blinds (up to 4)')
        ]),
        
        React.createElement('div', {
          key: 'unit-buttons',
          className: "flex gap-2 ml-auto"
        }, [
          React.createElement('button', {
            key: 'metric-unit',
            onClick: () => setUnits('metric'),
            className: `px-3 py-1 text-sm rounded transition-colors ${
              units === 'metric' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`
          }, 'Metric'),
          React.createElement('button', {
            key: 'imperial-unit',
            onClick: () => setUnits('imperial'),
            className: `px-3 py-1 text-sm rounded transition-colors ${
              units === 'imperial' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`
          }, 'Imperial')
        ])
      ])
    ]),

    // Fabric Settings
    React.createElement('div', {
      key: 'fabric-settings',
      className: "bg-amber-50 p-6 rounded-lg mb-8"
    }, [
      React.createElement('h3', {
        key: 'fabric-title',
        className: "text-lg font-semibold mb-4 flex items-center gap-2"
      }, [
        React.createElement(Package, {
          key: 'package-icon',
          className: "text-amber-600",
          size: 20
        }),
        'Fabric Purchase Settings'
      ]),
      React.createElement('div', { key: 'fabric-input' }, [
        React.createElement('label', {
          key: 'fabric-label',
          className: "block text-sm font-medium text-gray-700 mb-2"
        }, `Available Fabric Width ${units === 'metric' ? '(cm)' : '(inches)'}`),
        React.createElement('input', {
          key: 'fabric-width-input',
          type: "number",
          value: units === 'metric' ? fabricWidth : Math.round(fabricWidth / 2.54),
          onChange: (e) => setFabricWidth(units === 'metric' ? Number(e.target.value) : Number(e.target.value) * 2.54),
          min: units === 'metric' ? "100" : "40",
          max: units === 'metric' ? "300" : "120",
          className: "w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        }),
        React.createElement('p', {
          key: 'fabric-conversion',
          className: "text-sm text-gray-500 mt-1"
        }, units === 'metric' ? `= ${BlindCalculations.cmToFeetInches(fabricWidth)}` : `= ${fabricWidth.toFixed(1)}cm`),
        React.createElement('p', {
          key: 'fabric-increment',
          className: "text-xs text-gray-600 mt-2"
        }, `Purchasing increments: ${units === 'metric' ? '100cm (1m)' : '1 yard (36")'}`),
      ])
    ]),

    // Conditional rendering based on calculator mode
    useDualCalculator ? 
      React.createElement(MultiBlindCalculator, {
        key: 'multi-calculator',
        blinds: blinds,
        setBlinds: setBlinds,
        units: units,
        fabricWidth: fabricWidth
      }) :
      React.createElement(SingleBlindCalculator, {
        key: 'single-calculator',
        width: width,
        height: height,
        setWidth: setWidth,
        setHeight: setHeight,
        units: units,
        fabricWidth: fabricWidth
      }),

    // Footer sections (warnings, etc.)
    React.createElement('div', {
      key: 'imperial-info',
      className: "bg-blue-50 border-l-4 border-blue-500 p-4 mb-4"
    }, [
      React.createElement('h4', {
        key: 'imperial-title',
        className: "font-medium text-blue-800 mb-2"
      }, '✨ Imperial Measurements'),
      React.createElement('p', {
        key: 'imperial-description',
        className: "text-sm text-blue-700"
      }, [
        'Imperial mode shows measurements as ',
        React.createElement('strong', { key: 'feet-inches' }, 'feet and inches'),
        ' (e.g., 3\'2.5") and purchasing lengths in ',
        React.createElement('strong', { key: 'yards' }, 'yards'),
        '. Metric shows centimeters and meters.'
      ])
    ]),

    React.createElement('div', {
      key: 'safety-warning',
      className: "bg-red-50 border-l-4 border-red-500 p-4"
    }, [
      React.createElement('p', {
        key: 'safety-text',
        className: "text-sm text-red-700"
      }, [
        React.createElement('strong', { key: 'warning-icon' }, '⚠️ Safety Warning: '),
        'This roman blind uses exposed cords. Do not install where accessible to children due to strangulation hazard.'
      ])
    ])
  ]);
};
