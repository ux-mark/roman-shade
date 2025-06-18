// SingleBlindCalculator.js
const SingleBlindCalculator = ({ 
  width, 
  height, 
  setWidth, 
  setHeight, 
  units, 
  fabricWidth 
}) => {
  const { useState } = React;
  const [isInnerMeasurement, setIsInnerMeasurement] = useState(false);
  
  const calculations = BlindCalculations.getBlindCalculations(width, height, isInnerMeasurement);
  const ringPositions = BlindCalculations.getRingPositionsForBlind(width, isInnerMeasurement);
  const cordLengths = BlindCalculations.getCordLengthsForBlind(width, height, isInnerMeasurement);
  
  // Get Lucide icons
  const { Ruler, Package, ShoppingCart, Scissors } = lucideReact;

  return React.createElement('div', { key: 'single-blind-calculator' }, [
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
          className: "text-blue-600",
          size: 20
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
          }, units === 'metric' ? `= ${BlindCalculations.cmToFeetInches(width)}` : `= ${width.toFixed(1)}cm`)
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
          }, units === 'metric' ? `= ${BlindCalculations.cmToFeetInches(height)}` : `= ${height.toFixed(1)}cm`)
        ])
      ]),
      
      // Inner measurement toggle
      React.createElement('div', { 
        key: 'inner-measurement-toggle',
        className: "mt-4 bg-gray-100 p-3 rounded-md"
      }, [
        React.createElement('div', {
          key: 'toggle-container',
          className: "flex justify-between items-center"
        }, [
          React.createElement('span', {
            key: 'toggle-label',
            className: "text-sm font-medium text-gray-700"
          }, "Inner Window Measurement"),
          
          React.createElement('div', {
            key: 'toggle-controls',
            className: "flex items-center gap-3"
          }, [
            React.createElement('span', {
              key: 'toggle-status',
              className: "text-xs",
              style: { color: isInnerMeasurement ? '#1e40af' : '#6b7280' }
            }, isInnerMeasurement ? "Enabled" : "Disabled"),
            
            React.createElement('button', {
              key: 'toggle-btn',
              type: "button",
              onClick: () => setIsInnerMeasurement(!isInnerMeasurement),
              className: "rounded-md px-3 py-1 text-xs font-medium",
              style: {
                backgroundColor: isInnerMeasurement ? '#3b82f6' : '#e5e7eb',
                color: isInnerMeasurement ? 'white' : '#4b5563'
              }
            }, isInnerMeasurement ? "ON" : "OFF")
          ])
        ])
      ])
    ]),

    // Precision note
    React.createElement('div', { 
      key: 'precision-note',
      className: "mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4 text-sm text-yellow-800"
    }, [
      React.createElement('p', {}, [
        React.createElement('strong', {}, "Note: "),
        `All measurements are automatically reduced by ${units === 'metric' ? '0.5cm' : '1/4"'} for manufacturing precision. `,
        isInnerMeasurement && `Inner window measurement adds ${units === 'metric' ? '1cm' : '3/8"'} to width for proper fit.`
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
            key: 'scissors-icon1',
            className: "text-green-600",
            size: 20
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
            BlindCalculations.formatSingleUnit(calculations.faceFabricWidth, units)
          ]),
          React.createElement('p', { key: 'face-height' }, [
            React.createElement('span', { 
              key: 'face-height-label',
              className: "font-medium" 
            }, 'Height: '),
            BlindCalculations.formatSingleUnit(calculations.faceFabricHeight, units)
          ]),
          React.createElement('p', {
            key: 'face-allowances',
            className: "text-sm text-gray-600 mt-2"
          }, React.createElement('em', null, `Includes ${BlindCalculations.formatSingleUnit(14, units)} width + ${BlindCalculations.formatSingleUnit(35.5, units)} height allowances`))
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
            className: "text-yellow-600",
            size: 20
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
            BlindCalculations.formatSingleUnit(calculations.liningWidth, units)
          ]),
          React.createElement('p', { key: 'lining-height' }, [
            React.createElement('span', { 
              key: 'lining-height-label',
              className: "font-medium" 
            }, 'Height: '),
            BlindCalculations.formatSingleUnit(calculations.liningHeight, units)
          ]),
          React.createElement('p', {
            key: 'lining-allowances',
            className: "text-sm text-gray-600 mt-2"
          }, React.createElement('em', null, `Includes ${BlindCalculations.formatSingleUnit(2.5, units)} width + ${BlindCalculations.formatSingleUnit(5, units)} height allowances`))
        ])
      ])
    ]),

    // Shopping Guide
    React.createElement('div', {
      key: 'shopping-guide',
      className: "bg-purple-50 p-6 rounded-lg mb-8"
    }, [
      React.createElement('h3', {
        key: 'shopping-title',
        className: "text-lg font-semibold mb-4 flex items-center gap-2"
      }, [
        React.createElement(ShoppingCart, { 
          key: 'shopping-cart',
          className: "text-purple-600",
          size: 20
        }),
        'Fabric Shopping Guide'
      ]),
      
      React.createElement('div', {
        key: 'shopping-grid',
        className: "grid md:grid-cols-2 gap-6"
      }, [
        React.createElement('div', {
          key: 'face-purchase',
          className: "bg-white p-4 rounded-lg border border-purple-200"
        }, [
          React.createElement('h4', {
            key: 'face-purchase-title',
            className: "font-medium text-purple-800 mb-3"
          }, 'Face Fabric Purchase'),
          
          calculations.faceFabricWidth > fabricWidth && React.createElement('div', {
            key: 'face-warning',
            className: "bg-red-100 border border-red-300 p-3 rounded-md mb-3"
          }, [
            React.createElement('p', {
              key: 'face-warning-text',
              className: "text-red-800 text-sm font-medium"
            }, `⚠️ Width needed (${BlindCalculations.formatSingleUnit(calculations.faceFabricWidth, units)}) exceeds available (${BlindCalculations.formatSingleUnit(fabricWidth, units)})`)
          ]),
          
          React.createElement('div', {
            key: 'face-details',
            className: "space-y-2 text-sm"
          }, [
            React.createElement('p', { key: 'face-required' }, [
              React.createElement('span', { 
                key: 'face-required-label',
                className: "font-medium" 
              }, 'Required: '),
              `${BlindCalculations.formatSingleUnit(calculations.faceFabricWidth, units)} × ${BlindCalculations.formatSingleUnit(calculations.faceFabricHeight, units)}`
            ]),
            React.createElement('p', { key: 'face-purchase-length' }, [
              React.createElement('span', { 
                key: 'face-purchase-label',
                className: "font-medium" 
              }, 'Purchase: '),
              BlindCalculations.formatPurchaseLength(Math.ceil(calculations.faceFabricHeight / BlindCalculations.getPurchaseIncrement(units)) * BlindCalculations.getPurchaseIncrement(units), units)
            ]),
            React.createElement('div', {
              key: 'face-buy-box',
              className: "mt-3 p-2 bg-purple-100 rounded"
            }, [
              React.createElement('p', {
                key: 'face-buy-text',
                className: "font-medium text-purple-800"
              }, [
                React.createElement('strong', {
                  key: 'face-buy-strong'
                }, `Buy: ${BlindCalculations.formatPurchaseLength(Math.ceil(calculations.faceFabricHeight / BlindCalculations.getPurchaseIncrement(units)) * BlindCalculations.getPurchaseIncrement(units), units)}`)
              ])
            ])
          ])
        ]),

        React.createElement('div', {
          key: 'lining-purchase',
          className: "bg-white p-4 rounded-lg border border-purple-200"
        }, [
          React.createElement('h4', {
            key: 'lining-purchase-title',
            className: "font-medium text-purple-800 mb-3"
          }, 'Lining Fabric Purchase'),
          
          React.createElement('div', {
            key: 'lining-details',
            className: "space-y-2 text-sm"
          }, [
            React.createElement('p', { key: 'lining-required' }, [
              React.createElement('span', { 
                key: 'lining-required-label',
                className: "font-medium" 
              }, 'Required: '),
              `${BlindCalculations.formatSingleUnit(calculations.liningWidth, units)} × ${BlindCalculations.formatSingleUnit(calculations.liningHeight, units)}`
            ]),
            React.createElement('p', { key: 'lining-purchase-length' }, [
              React.createElement('span', { 
                key: 'lining-purchase-label',
                className: "font-medium" 
              }, 'Purchase: '),
              BlindCalculations.formatPurchaseLength(Math.ceil(calculations.liningHeight / BlindCalculations.getPurchaseIncrement(units)) * BlindCalculations.getPurchaseIncrement(units), units)
            ]),
            React.createElement('div', {
              key: 'lining-buy-box',
              className: "mt-3 p-2 bg-purple-100 rounded"
            }, [
              React.createElement('p', {
                key: 'lining-buy-text',
                className: "font-medium text-purple-800"
              }, [
                React.createElement('strong', {
                  key: 'lining-buy-strong'
                }, `Buy: ${BlindCalculations.formatPurchaseLength(Math.ceil(calculations.liningHeight / BlindCalculations.getPurchaseIncrement(units)) * BlindCalculations.getPurchaseIncrement(units), units)}`)
              ])
            ])
          ])
        ])
      ])
    ]),

    // Cutting Guide for Single Blind
    React.createElement('div', {
      key: 'cutting-guide',
      className: "bg-green-50 p-6 rounded-lg mb-8"
    }, [
      React.createElement('h3', {
        key: 'cutting-title',
        className: "text-lg font-semibold mb-4 flex items-center gap-2"
      }, [
        React.createElement(Scissors, {
          key: 'scissors-icon',
          className: "text-green-600",
          size: 20
        }),
        'Cutting Guide for Each Blind'
      ]),
      React.createElement('div', {
        key: 'cutting-explanation',
        className: "mb-4 bg-green-100 p-4 rounded-md text-sm text-green-800"
      }, [
        React.createElement('p', {
          key: 'cutting-explanation-text',
          className: "mb-2"
        }, [
          React.createElement('strong', {}, "Fabric Measurement Adjustments: "), 
          "Your fabric includes these precision adjustments:"
        ]),
        React.createElement('ul', {
          key: 'cutting-explanation-list',
          className: "list-disc pl-5 space-y-1"
        }, [
          React.createElement('li', {}, [
            React.createElement('strong', {}, "Face Fabric Width: "), 
            `Finished width + 14${units === 'metric' ? 'cm' : '"'} (7${units === 'metric' ? 'cm' : '"'} seam allowance on each side)`
          ]),
          React.createElement('li', {}, [
            React.createElement('strong', {}, "Face Fabric Height: "), 
            `Finished height + 35.5${units === 'metric' ? 'cm' : '"'} (30.5${units === 'metric' ? 'cm' : '"'} for bottom hem + 2.5${units === 'metric' ? 'cm' : '"'} for top edge + 2.5${units === 'metric' ? 'cm' : '"'} safety margin)`
          ]),
          React.createElement('li', {}, [
            React.createElement('strong', {}, "Lining Width: "), 
            `Finished width + 2.5${units === 'metric' ? 'cm' : '"'} (slightly wider than finished blind)`
          ]),
          React.createElement('li', {}, [
            React.createElement('strong', {}, "Lining Height: "), 
            `Finished height + 5${units === 'metric' ? 'cm' : '"'} (accounts for top and bottom edges)`
          ])
        ])
      ]),
      React.createElement('div', {
        key: 'cutting-grid',
        className: "grid md:grid-cols-2 gap-4"
      }, [
        React.createElement('div', {
          key: 'face-fabric-cut',
          className: "bg-white p-4 rounded-lg border border-green-200"
        }, [
          React.createElement('h4', {
            key: 'face-fabric-cut-title',
            className: "font-medium text-green-800 mb-3"
          }, 'Face Fabric'),
          React.createElement('div', {
            key: 'face-fabric-cut-details',
            className: "space-y-2 text-sm"
          }, [
            React.createElement('p', {
              key: 'face-fabric-cut-dimensions',
            }, [
              React.createElement('span', {
                key: 'face-fabric-cut-dimensions-label',
                className: "font-medium"
              }, "Cut Size: "),
              `${BlindCalculations.formatSingleUnit(calculations.faceFabricWidth, units)} × ${BlindCalculations.formatSingleUnit(calculations.faceFabricHeight, units)}`
            ]),
            React.createElement('p', {
              key: 'face-fabric-cut-note',
              className: "text-xs text-gray-600 mt-2 italic"
            }, 'Includes necessary allowances for all edges and seams')
          ])
        ]),
        React.createElement('div', {
          key: 'lining-fabric-cut',
          className: "bg-white p-4 rounded-lg border border-green-200"
        }, [
          React.createElement('h4', {
            key: 'lining-fabric-cut-title',
            className: "font-medium text-green-800 mb-3"
          }, 'Lining Fabric'),
          React.createElement('div', {
            key: 'lining-fabric-cut-details',
            className: "space-y-2 text-sm"
          }, [
            React.createElement('p', {
              key: 'lining-fabric-cut-dimensions',
            }, [
              React.createElement('span', {
                key: 'lining-fabric-cut-dimensions-label',
                className: "font-medium"
              }, "Cut Size: "),
              `${BlindCalculations.formatSingleUnit(calculations.liningWidth, units)} × ${BlindCalculations.formatSingleUnit(calculations.liningHeight, units)}`
            ]),
            React.createElement('p', {
              key: 'lining-fabric-cut-note',
              className: "text-xs text-gray-600 mt-2 italic"
            }, 'Sized to fit perfectly behind the face fabric')
          ])
        ])
      ])
    ]),

    // Hardware & Supplies
    React.createElement('div', {
      key: 'hardware',
      className: "bg-gray-50 p-6 rounded-lg mb-8"
    }, [
      React.createElement('h3', {
        key: 'hardware-title',
        className: "text-lg font-semibold mb-4 flex items-center gap-2"
      }, [
        React.createElement(Package, {
          key: 'package-icon',
          className: "text-gray-600",
          size: 20
        }),
        'Hardware & Supplies'
      ]),
      React.createElement('div', {
        key: 'hardware-grid',
        className: "grid md:grid-cols-2 gap-4 text-sm"
      }, [
        React.createElement('p', { key: 'rings' }, [
          React.createElement('span', { 
            key: 'rings-label',
            className: "font-medium" 
          }, 'Rings: '),
          `${calculations.ringRows * calculations.verticalRings} rings (${calculations.ringRows} columns × ${calculations.verticalRings} rows)`
        ]),
        React.createElement('p', { key: 'mounting-board' }, [
          React.createElement('span', { 
            key: 'mounting-board-label',
            className: "font-medium" 
          }, 'Mounting Board: '),
          BlindCalculations.formatSingleUnit(calculations.mountingBoardLength, units)
        ]),
        React.createElement('p', { key: 'weight-rod' }, [
          React.createElement('span', { 
            key: 'weight-rod-label',
            className: "font-medium" 
          }, 'Weight Rod: '),
          BlindCalculations.formatSingleUnit(calculations.weightRodLength, units)
        ]),
        React.createElement('p', { key: 'screw-eyes' }, [
          React.createElement('span', { 
            key: 'screw-eyes-label',
            className: "font-medium" 
          }, 'Screw Eyes: '),
          `${calculations.ringRows} pieces (1 for each column of rings)`
        ]),
        React.createElement('p', { key: 'cord-control' }, [
          React.createElement('span', { 
            key: 'cord-control-label',
            className: "font-medium" 
          }, 'Cord Control: '),
          '1 tension lock (recommended) or cord cleat'
        ]),
        React.createElement('p', { key: 'cord-cleats' }, [
          React.createElement('span', { 
            key: 'cord-cleats-label',
            className: "font-medium" 
          }, 'Cord Cleats: '),
          width < 100 ? '1 piece (optional if using tension lock)' : '2 pieces (optional if using tension lock)'
        ])
      ])
    ]),

    // Ring Placement Layout
    React.createElement('div', {
      key: 'ring-layout',
      className: "bg-gray-50 p-6 rounded-lg mb-8"
    }, [
      React.createElement('h3', {
        key: 'ring-layout-title',
        className: "text-lg font-semibold mb-4"
      }, '📍 Ring Placement Layout'),
      
      React.createElement('div', {
        key: 'ring-info',
        className: "mb-4"
      }, [
        React.createElement('p', { 
          key: 'ring-count',
          className: "font-medium" 
        }, `Total Rings: ${calculations.ringRows * calculations.verticalRings} (${calculations.ringRows} columns × ${calculations.verticalRings} rows)`),
        React.createElement('p', { 
          key: 'ring-spacing',
          className: "text-sm text-gray-600" 
        }, 'Position columns across the width with rings in each column.')
      ]),
      
      React.createElement('div', {
        key: 'ring-horizontal',
        className: "mb-4"
      }, [
        React.createElement('h4', { 
          key: 'ring-horizontal-title',
          className: "text-md font-medium mb-2" 
        }, 'Horizontal Ring Positions (from left edge):'),
        React.createElement('div', {
          key: 'ring-horizontal-positions',
          className: "flex flex-wrap gap-2"
        }, ringPositions.map((pos, idx) => 
          React.createElement('span', {
            key: `ring-pos-${idx}`,
            className: "px-2 py-1 bg-blue-100 rounded text-sm"
          }, `${BlindCalculations.formatSingleUnit(pos, units)}`)
        ))
      ]),

      // Blind Visualization
      React.createElement('div', {
        key: 'blind-visual',
        className: "border-2 border-dashed border-gray-300 p-4 bg-white rounded-lg"
      }, [
        React.createElement('div', {
          key: 'blind-container',
          className: "relative bg-gray-50 border border-gray-200",
          style: {
            width: '100%',
            height: '160px'
          }
        }, [
          // Rings visualization
          ...ringPositions.map((xPos, colIdx) => {
            const verticalPositions = [];
            const verticalSpacing = height / (calculations.verticalRings + 1);
            
            for (let rowIdx = 1; rowIdx <= calculations.verticalRings; rowIdx++) {
              verticalPositions.push(rowIdx * verticalSpacing);
            }

            return verticalPositions.map((yPos, rowIdx) => 
              React.createElement('div', {
                key: `ring-${colIdx}-${rowIdx}`,
                className: "absolute w-2 h-2 bg-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2",
                style: {
                  left: `${(xPos / width) * 100}%`,
                  top: `${(yPos / height) * 100}%`
                }
              })
            );
          }).flat()
        ])
      ])
    ]),

    // Cord Lengths
    React.createElement('div', {
      key: 'cord-lengths',
      className: "bg-orange-50 p-6 rounded-lg mb-8"
    }, [
      React.createElement('h3', {
        key: 'cord-lengths-title',
        className: "text-lg font-semibold mb-4"
      }, '🧵 Cord Lengths (Right-hand Draw)'),
      React.createElement('div', {
        key: 'cord-lengths-grid',
        className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
      }, cordLengths.map((length, idx) => 
        React.createElement('div', {
          key: `cord-${idx}`,
          className: "p-3 bg-white rounded-lg border border-orange-200"
        }, [
          React.createElement('p', {
            key: `cord-${idx}-title`,
            className: "font-medium text-orange-800"
          }, `Cord ${idx + 1}`),
          React.createElement('p', {
            key: `cord-${idx}-length`,
            className: "text-sm"
          }, BlindCalculations.formatSingleUnit(length, units))
        ])
      )),
      React.createElement('p', {
        key: 'cord-note',
        className: "text-sm text-gray-600 mt-3"
      }, 'Cords are numbered left to right. First cord (leftmost) is the longest as it travels further across the headrail.'),
      React.createElement('div', {
        key: 'cord-total',
        className: "mt-4 p-3 bg-orange-100 rounded"
      }, [
        React.createElement('p', {
          key: 'cord-total-text',
          className: "font-medium"
        }, [
          'Total cord needed: ',
          React.createElement('strong', {
            key: 'cord-total-strong'
          }, BlindCalculations.formatSingleUnit(cordLengths.reduce((sum, length) => sum + length, 0), units))
        ])
      ])
    ]),

    // Key Construction Measurements
    React.createElement('div', {
      key: 'construction-measurements',
      className: "bg-indigo-50 p-6 rounded-lg mb-8"
    }, [
      React.createElement('h3', {
        key: 'construction-title',
        className: "text-lg font-semibold mb-4"
      }, '📏 Key Construction Measurements'),
      React.createElement('div', {
        key: 'construction-grid',
        className: "grid md:grid-cols-3 gap-4 text-sm"
      }, [
        React.createElement('div', {
          key: 'seam-allowances',
          className: "p-3 bg-white rounded border border-indigo-200"
        }, [
          React.createElement('h4', {
            key: 'seam-title',
            className: "font-medium text-indigo-800 mb-1"
          }, 'Seam Allowances'),
          React.createElement('p', { key: 'seam-top' }, `Top edge: ${BlindCalculations.formatSingleUnit(2.5, units)}`),
          React.createElement('p', { key: 'seam-sides' }, `Side edges: ${BlindCalculations.formatSingleUnit(7, units)} each`),
          React.createElement('p', { key: 'seam-bottom' }, `Bottom hem: ${BlindCalculations.formatSingleUnit(30.5, units)}`)
        ]),
        React.createElement('div', {
          key: 'rod-pockets',
          className: "p-3 bg-white rounded border border-indigo-200"
        }, [
          React.createElement('h4', {
            key: 'rod-title',
            className: "font-medium text-indigo-800 mb-1"
          }, 'Rod Pocket'),
          React.createElement('p', { key: 'rod-depth' }, `Depth: ${BlindCalculations.formatSingleUnit(2.5, units)}`),
          React.createElement('p', { key: 'rod-position' }, `Position from bottom: ${BlindCalculations.formatSingleUnit(5, units)}`)
        ]),
        React.createElement('div', {
          key: 'ring-spacing',
          className: "p-3 bg-white rounded border border-indigo-200"
        }, [
          React.createElement('h4', {
            key: 'spacing-title',
            className: "font-medium text-indigo-800 mb-1"
          }, 'Ring Spacing'),
          React.createElement('p', { key: 'spacing-horizontal' }, `Horizontal: ~${BlindCalculations.formatSingleUnit(width / (calculations.ringRows - 1), units)}`),
          React.createElement('p', { key: 'spacing-vertical' }, `Vertical: ~${BlindCalculations.formatSingleUnit(height / (calculations.verticalRings + 1), units)}`)
        ])
      ])
    ])
  ]);
};
