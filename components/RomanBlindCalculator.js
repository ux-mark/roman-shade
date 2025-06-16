const { useState } = React;
const { Calculator, Ruler, Scissors, Package, ShoppingCart } = lucide;

const RomanBlindCalculator = () => {
  const [units, setUnits] = useState('metric');
  const [useDualCalculator, setUseDualCalculator] = useState(false);
  const [width, setWidth] = useState(80);
  const [height, setHeight] = useState(160);
  const [fabricWidth, setFabricWidth] = useState(140);
  
  const [blinds, setBlinds] = useState([
    { width: 80, height: 160 },
    { width: 80, height: 160 }
  ]);

  const cmToFeetInches = (cm) => {
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = (totalInches % 12).toFixed(1);
    if (feet === 0) {
      return `${inches}"`;
    }
    return `${feet}'${inches}"`;
  };

  const formatMeasurement = (cm) => {
    if (units === 'metric') {
      return `${cm}cm (${cmToFeetInches(cm)})`;
    } else {
      return `${cmToFeetInches(cm)} (${cm}cm)`;
    }
  };

  const formatSingleUnit = (cm) => {
    if (units === 'metric') {
      return `${cm}cm`;
    } else {
      return cmToFeetInches(cm);
    }
  };

  const formatPurchaseLength = (cm) => {
    if (units === 'metric') {
      const meters = (cm / 100).toFixed(1);
      return `${meters}m`;
    } else {
      const yards = (cm / 91.44).toFixed(1);
      return `${yards}yd`;
    }
  };

  const getPurchaseIncrement = () => {
    return units === 'metric' ? 100 : 91.44;
  };

  const calculations = {
    faceFabricWidth: width + 14,
    faceFabricHeight: height + 35.5,
    liningWidth: width + 2,
    liningHeight: height + 5,
    mountingBoardLength: width - 0.5,
    weightRodLength: width - 1,
    ringRows: Math.max(3, Math.ceil(width / 16)),
    verticalRings: Math.ceil(height / 20),
  };

  const getTotalRings = () => {
    return calculations.ringRows * calculations.verticalRings;
  };

  // Calculate ring positions for a specific blind
  const getRingPositionsForBlind = (blindWidth) => {
    const ringRows = Math.max(3, Math.ceil(blindWidth / 16));
    const positions = [];
    const spacing = (blindWidth - 5) / Math.max(2, ringRows - 1); // 2.5cm from each edge
    
    for (let i = 0; i < ringRows; i++) {
      positions.push(2.5 + (i * spacing));
    }
    return positions;
  };

  // Calculate cord lengths for a specific blind
  const getCordLengthsForBlind = (blindWidth, blindHeight) => {
    const baseLength = blindHeight * 2.5;
    const ringPositions = getRingPositionsForBlind(blindWidth);
    
    return ringPositions.map((pos, index) => {
      const additionalLength = (ringPositions.length - 1 - index) * 30;
      return Math.round((baseLength + additionalLength) / 10) * 10;
    });
  };

  // Calculate ring positions (for single blind - backward compatibility)
  const getRingPositions = () => {
    return getRingPositionsForBlind(width);
  };

  // Calculate cord lengths (for single blind - backward compatibility)
  const getCordLengths = () => {
    return getCordLengthsForBlind(width, height);
  };

  // Calculate ring data for a specific blind
  const getBlindRingData = (blindWidth, blindHeight) => {
    const ringRows = Math.max(3, Math.ceil(blindWidth / 16));
    const verticalRings = Math.ceil(blindHeight / 20);
    const totalRings = ringRows * verticalRings;
    const ringPositions = getRingPositionsForBlind(blindWidth);
    const cordLengths = getCordLengthsForBlind(blindWidth, blindHeight);
    
    return {
      ringRows,
      verticalRings,
      totalRings,
      ringPositions,
      cordLengths
    };
  };

  const addBlind = () => {
    if (blinds.length < 4) {
      setBlinds([...blinds, { width: 80, height: 160 }]);
    }
  };

  const removeBlind = () => {
    if (blinds.length > 1) {
      setBlinds(blinds.slice(0, -1));
    }
  };

  const updateBlind = (index, field, value) => {
    const newBlinds = [...blinds];
    newBlinds[index][field] = Number(value);
    setBlinds(newBlinds);
  };

  const calculateMultiBlindRequirements = () => {
    const requirements = blinds.map((blind, index) => {
      const faceFabricWidth = blind.width + 14;
      const faceFabricHeight = blind.height + 35.5;
      const liningWidth = blind.width + 2;
      const liningHeight = blind.height + 5;

      return {
        blindIndex: index + 1,
        originalWidth: blind.width,
        originalHeight: blind.height,
        faceFabric: { width: faceFabricWidth, height: faceFabricHeight },
        lining: { width: liningWidth, height: liningHeight }
      };
    });

    const maxFaceFabricWidth = Math.max(...requirements.map(r => r.faceFabric.width));
    const maxLiningWidth = Math.max(...requirements.map(r => r.lining.width));
    const totalFaceFabricHeight = requirements.reduce((sum, r) => sum + r.faceFabric.height, 0);
    const totalLiningHeight = requirements.reduce((sum, r) => sum + r.lining.height, 0);

    const purchaseIncrement = getPurchaseIncrement();
    const faceFabricLength = Math.ceil(totalFaceFabricHeight / purchaseIncrement) * purchaseIncrement;
    const liningLength = Math.ceil(totalLiningHeight / purchaseIncrement) * purchaseIncrement;

    return {
      requirements,
      shopping: {
        faceFabric: {
          fitsWidth: maxFaceFabricWidth <= fabricWidth,
          requiredWidth: maxFaceFabricWidth,
          requiredLength: faceFabricLength,
        },
        lining: {
          fitsWidth: maxLiningWidth <= fabricWidth,
          requiredWidth: maxLiningWidth,
          requiredLength: liningLength,
        }
      }
    };
  };

  const multiBlindData = useDualCalculator ? calculateMultiBlindRequirements() : null;

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
          key: 'calc-icon',
          className: "text-blue-600"
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
          className: "text-amber-600"
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
        }, units === 'metric' ? `= ${cmToFeetInches(fabricWidth)}` : `= ${fabricWidth.toFixed(1)}cm`),
        React.createElement('p', {
          key: 'fabric-increment',
          className: "text-xs text-gray-600 mt-2"
        }, `Purchasing increments: ${units === 'metric' ? '100cm (1m)' : '1 yard (36")'}`),
      ])
    ]),

    // Conditional rendering based on calculator mode
    useDualCalculator ? 
      // Multiple Blinds Calculator
      React.createElement('div', {
        key: 'multi-blind-calculator',
        className: "space-y-8 mb-8"
      }, [
        // Multiple Blind Dimensions section would go here...
        // [Truncated for brevity - this would include all the multi-blind sections]
      ]) :
      
      // Single Blind Calculator  
      React.createElement('div', {
        key: 'single-blind-calculator'
      }, [
        // Single blind dimensions
        React.createElement('div', {
          key: 'single-dimensions',
          className: "bg-blue-50 p-6 rounded-lg mb-8"
        }, [
          React.createElement('h2', {
            key: 'dimensions-title',
            className: "text-xl font-semibold mb-4 flex items-center gap-2"
          }, [
            React.createElement(Ruler, {
              key: 'ruler-icon',
              className: "text-blue-600"
            }),
            'Finished Blind Dimensions'
          ]),
          React.createElement('div', {
            key: 'dimensions-inputs',
            className: "grid md:grid-cols-2 gap-4"
          }, [
            React.createElement('div', { key: 'width-input' }, [
              React.createElement('label', {
                key: 'width-label',
                className: "block text-sm font-medium text-gray-700 mb-2"
              }, `Width ${units === 'metric' ? '(cm)' : '(inches)'}`),
              React.createElement('input', {
                key: 'width-field',
                type: "number",
                value: units === 'metric' ? width : Math.round(width / 2.54 * 10) / 10,
                onChange: (e) => setWidth(units === 'metric' ? Number(e.target.value) : Number(e.target.value) * 2.54),
                min: units === 'metric' ? "30" : "12",
                max: units === 'metric' ? "300" : "120",
                step: units === 'metric' ? "1" : "0.1",
                className: "w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }),
              React.createElement('p', {
                key: 'width-conversion',
                className: "text-sm text-gray-500 mt-1"
              }, units === 'metric' ? `= ${cmToFeetInches(width)}` : `= ${width.toFixed(1)}cm`)
            ]),
            React.createElement('div', { key: 'height-input' }, [
              React.createElement('label', {
                key: 'height-label',
                className: "block text-sm font-medium text-gray-700 mb-2"
              }, `Height ${units === 'metric' ? '(cm)' : '(inches)'}`),
              React.createElement('input', {
                key: 'height-field',
                type: "number",
                value: units === 'metric' ? height : Math.round(height / 2.54 * 10) / 10,
                onChange: (e) => setHeight(units === 'metric' ? Number(e.target.value) : Number(e.target.value) * 2.54),
                min: units === 'metric' ? "50" : "20",
                max: units === 'metric' ? "400" : "160",
                step: units === 'metric' ? "1" : "0.1",
                className: "w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }),
              React.createElement('p', {
                key: 'height-conversion',
                className: "text-sm text-gray-500 mt-1"
              }, units === 'metric' ? `= ${cmToFeetInches(height)}` : `= ${height.toFixed(1)}cm`)
            ])
          ])
        ]),

        // Face and Lining Fabric sections
        React.createElement('div', {
          key: 'fabric-sections',
          className: "grid md:grid-cols-2 gap-6 mb-8"
        }, [
          React.createElement('div', {
            key: 'face-fabric',
            className: "bg-green-50 p-6 rounded-lg"
          }, [
            React.createElement('h3', {
              key: 'face-title',
              className: "text-lg font-semibold mb-4 flex items-center gap-2"
            }, [
              React.createElement(Scissors, {
                key: 'scissors-icon',
                className: "text-green-600"
              }),
              'Face Fabric'
            ]),
            React.createElement('div', {
              key: 'face-measurements',
              className: "space-y-2"
            }, [
              React.createElement('p', { key: 'face-width' }, [
                React.createElement('span', { 
                  key: 'face-width-label',
                  className: "font-medium" 
                }, 'Width: '),
                formatMeasurement(calculations.faceFabricWidth)
              ]),
              React.createElement('p', { key: 'face-height' }, [
                React.createElement('span', { 
                  key: 'face-height-label',
                  className: "font-medium" 
                }, 'Height: '),
                formatMeasurement(calculations.faceFabricHeight)
              ]),
              React.createElement('p', {
                key: 'face-allowances',
                className: "text-sm text-gray-600 mt-2"
              }, React.createElement('em', null, `Includes ${formatSingleUnit(14)} width + ${formatSingleUnit(35.5)} height allowances`))
            ])
          ]),

          React.createElement('div', {
            key: 'lining-fabric',
            className: "bg-yellow-50 p-6 rounded-lg"
          }, [
            React.createElement('h3', {
              key: 'lining-title',
              className: "text-lg font-semibold mb-4 flex items-center gap-2"
            }, [
              React.createElement(Scissors, {
                key: 'scissors-icon2',
                className: "text-yellow-600"
              }),
              'Lining Fabric'
            ]),
            React.createElement('div', {
              key: 'lining-measurements',
              className: "space-y-2"
            }, [
              React.createElement('p', { key: 'lining-width' }, [
                React.createElement('span', { 
                  key: 'lining-width-label',
                  className: "font-medium" 
                }, 'Width: '),
                formatMeasurement(calculations.liningWidth)
              ]),
              React.createElement('p', { key: 'lining-height' }, [
                React.createElement('span', { 
                  key: 'lining-height-label',
                  className: "font-medium" 
                }, 'Height: '),
                formatMeasurement(calculations.liningHeight)
              ]),
              React.createElement('p', {
                key: 'lining-allowances',
                className: "text-sm text-gray-600 mt-2"
              }, React.createElement('em', null, `Includes ${formatSingleUnit(2)} width + ${formatSingleUnit(5)} height allowances`))
            ])
          ])
        ])

        // Additional single blind sections would continue here...
        // [Note: For brevity, I'm showing the pattern. The full component would include all sections]
      ]),

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