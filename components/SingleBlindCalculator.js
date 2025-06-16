// No need for Lucide icons, using emojis instead

const SingleBlindCalculator = ({ 
  width, 
  height, 
  setWidth, 
  setHeight, 
  units, 
  fabricWidth 
}) => {
  const calculations = BlindCalculations.getBlindCalculations(width, height);
  const ringPositions = BlindCalculations.getRingPositionsForBlind(width);
  const cordLengths = BlindCalculations.getCordLengthsForBlind(width, height);

  return React.createElement('div', { key: 'single-blind-calculator' }, [
    // Single blind dimensions
    React.createElement('div', {
      key: 'single-dimensions',
      className: "bg-blue-50 p-6 rounded-lg mb-8"
    }, [
      React.createElement('h2', {
        key: 'dimensions-title',
        className: "text-xl font-semibold mb-4 flex items-center gap-2"
      }, '📏 Finished Blind Dimensions'),
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
        }, '✂️ Face Fabric'),
        React.createElement('div', {
          key: 'face-measurements',
          className: "space-y-2"
        }, [
          React.createElement('p', { key: 'face-width' }, [
            React.createElement('span', { 
              key: 'face-width-label',
              className: "font-medium" 
            }, 'Width: '),
            BlindCalculations.formatMeasurement(calculations.faceFabricWidth, units)
          ]),
          React.createElement('p', { key: 'face-height' }, [
            React.createElement('span', { 
              key: 'face-height-label',
              className: "font-medium" 
            }, 'Height: '),
            BlindCalculations.formatMeasurement(calculations.faceFabricHeight, units)
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
        }, '✂️ Lining Fabric'),
        React.createElement('div', {
          key: 'lining-measurements',
          className: "space-y-2"
        }, [
          React.createElement('p', { key: 'lining-width' }, [
            React.createElement('span', { 
              key: 'lining-width-label',
              className: "font-medium" 
            }, 'Width: '),
            BlindCalculations.formatMeasurement(calculations.liningWidth, units)
          ]),
          React.createElement('p', { key: 'lining-height' }, [
            React.createElement('span', { 
              key: 'lining-height-label',
              className: "font-medium" 
            }, 'Height: '),
            BlindCalculations.formatMeasurement(calculations.liningHeight, units)
          ]),
          React.createElement('p', {
            key: 'lining-allowances',
            className: "text-sm text-gray-600 mt-2"
          }, React.createElement('em', null, `Includes ${BlindCalculations.formatSingleUnit(2, units)} width + ${BlindCalculations.formatSingleUnit(5, units)} height allowances`))
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
      }, '🛒 Fabric Shopping Guide'),
      
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
                React.createElement('strong', null, `Buy: ${BlindCalculations.formatPurchaseLength(Math.ceil(calculations.faceFabricHeight / BlindCalculations.getPurchaseIncrement(units)) * BlindCalculations.getPurchaseIncrement(units), units)}`)
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
                React.createElement('strong', null, `Buy: ${BlindCalculations.formatPurchaseLength(Math.ceil(calculations.liningHeight / BlindCalculations.getPurchaseIncrement(units)) * BlindCalculations.getPurchaseIncrement(units), units)}`)
              ])
            ])
          ])
        ])
      ])
    ]),

    // Hardware & Supplies
    React.createElement('div', {
      key: 'hardware-section',
      className: "bg-gray-50 p-6 rounded-lg mb-8"
    }, [
      React.createElement('h3', {
        key: 'hardware-title',
        className: "text-lg font-semibold mb-4 flex items-center gap-2"
      }, '📦 Hardware & Supplies'),
      React.createElement('div', {
        key: 'hardware-grid',
        className: "grid md:grid-cols-2 gap-4 text-sm"
      }, [
        React.createElement('div', { key: 'hardware-left' }, [
          React.createElement('p', { key: 'mounting-board' }, [
            React.createElement('span', { 
              key: 'mounting-label',
              className: "font-medium" 
            }, 'Mounting Board: '),
            `${BlindCalculations.formatMeasurement(calculations.mountingBoardLength, units)} long`
          ]),
          React.createElement('p', { key: 'weight-rod' }, [
            React.createElement('span', { 
              key: 'weight-label',
              className: "font-medium" 
            }, 'Weight Rod: '),
            BlindCalculations.formatMeasurement(calculations.weightRodLength, units)
          ]),
          React.createElement('p', { key: 'blind-rings' }, [
            React.createElement('span', { 
              key: 'rings-label',
              className: "font-medium" 
            }, 'Blind Rings: '),
            `${calculations.ringRows * calculations.verticalRings} pieces`
          ])
        ]),
        React.createElement('div', { key: 'hardware-right' }, [
          React.createElement('p', { key: 'ring-columns' }, [
            React.createElement('span', { 
              key: 'columns-label',
              className: "font-medium" 
            }, 'Ring Columns: '),
            calculations.ringRows
          ]),
          React.createElement('p', { key: 'ring-rows' }, [
            React.createElement('span', { 
              key: 'rows-label',
              className: "font-medium" 
            }, 'Ring Rows: '),
            calculations.verticalRings
          ]),
          React.createElement('p', { key: 'screw-eyes' }, [
            React.createElement('span', { 
              key: 'screws-label',
              className: "font-medium" 
            }, 'Screw Eyes: '),
            `${calculations.ringRows} pieces`
          ])
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
        key: 'horizontal-positions',
        className: "mb-4"
      }, [
        React.createElement('h4', {
          key: 'horizontal-title',
          className: "font-medium mb-2"
        }, 'Horizontal Ring Positions (from left edge):'),
        React.createElement('div', {
          key: 'position-tags',
          className: "flex flex-wrap gap-2"
        }, ringPositions.map((pos, index) => 
          React.createElement('span', {
            key: `pos-${index}`,
            className: "bg-blue-100 px-3 py-1 rounded"
          }, `Column ${index + 1}: ${BlindCalculations.formatMeasurement(Math.round(pos * 10) / 10, units)}`)
        ))
      ]),

      React.createElement('div', {
        key: 'vertical-spacing',
        className: "mb-4"
      }, [
        React.createElement('h4', {
          key: 'vertical-title',
          className: "font-medium mb-2"
        }, 'Vertical Ring Spacing:'),
        React.createElement('p', { key: 'vertical-info' }, `Every ${BlindCalculations.formatMeasurement(20, units)} starting from bottom hem`),
        React.createElement('p', {
          key: 'vertical-total',
          className: "text-sm text-gray-600"
        }, `Total: ${calculations.verticalRings} horizontal rows`)
      ]),

      // Visual Ring Layout
      React.createElement('div', {
        key: 'visual-layout',
        className: "border-2 border-dashed border-gray-300 p-4 bg-white rounded-lg"
      }, [
        React.createElement('div', {
          key: 'visual-title',
          className: "text-center text-sm text-gray-600 mb-2"
        }, 'Visual Ring Layout'),
        React.createElement('div', {
          key: 'visual-grid',
          className: "font-mono text-xs"
        }, Array.from({ length: calculations.verticalRings }, (_, row) => 
          React.createElement('div', {
            key: `row-${row}`,
            className: "flex justify-between items-center py-1"
          }, [
            React.createElement('span', {
              key: `height-${row}`,
              className: "text-gray-500 w-16"
            }, `${BlindCalculations.formatMeasurement((calculations.verticalRings - 1 - row) * 20, units)}:`),
            React.createElement('div', {
              key: `rings-${row}`,
              className: "flex-1 flex justify-around mx-4"
            }, ringPositions.map((_, col) => 
              React.createElement('span', {
                key: `ring-${row}-${col}`,
                className: "text-blue-600 text-lg"
              }, '○')
            )),
            React.createElement('span', {
              key: `row-num-${row}`,
              className: "text-gray-400 w-12 text-right"
            }, `Row ${calculations.verticalRings - row}`)
          ])
        )),
        React.createElement('div', {
          key: 'visual-footer',
          className: "mt-2 text-xs text-gray-500 text-center"
        }, 'Bottom of blind ↑ • Each ○ represents a ring position • Top of blind')
      ])
    ]),

    // Cord Lengths
    React.createElement('div', {
      key: 'cord-lengths',
      className: "bg-orange-50 p-6 rounded-lg mb-8"
    }, [
      React.createElement('h3', {
        key: 'cord-title',
        className: "text-lg font-semibold mb-4"
      }, '🧵 Cord Lengths (Right-hand Draw)'),
      React.createElement('div', {
        key: 'cord-grid',
        className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
      }, cordLengths.map((length, index) => 
        React.createElement('div', {
          key: `cord-${index}`,
          className: "text-center"
        }, [
          React.createElement('div', {
            key: `cord-box-${index}`,
            className: "bg-orange-200 p-3 rounded"
          }, [
            React.createElement('div', {
              key: `cord-col-${index}`,
              className: "font-medium"
            }, `Column ${index + 1}`),
            React.createElement('div', {
              key: `cord-length-${index}`,
              className: "text-sm"
            }, BlindCalculations.formatMeasurement(length, units))
          ])
        ])
      )),
      React.createElement('p', {
        key: 'cord-total',
        className: "text-sm text-gray-600 mt-3"
      }, React.createElement('em', null, `Total cord needed: approximately ${BlindCalculations.formatMeasurement(Math.round(cordLengths.reduce((a, b) => a + b, 0) / 100) * 100, units)}`)),
      React.createElement('div', {
        key: 'cord-tip',
        className: "mt-4 p-3 bg-orange-100 rounded"
      }, [
        React.createElement('p', {
          key: 'cord-tip-text',
          className: "text-sm text-orange-800"
        }, [
          React.createElement('strong', null, 'Tip: '),
          'Leftmost cord is longest (travels furthest), rightmost cord is shortest. This creates the pull-cord bundle on the right side.'
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
        React.createElement('div', { key: 'construction-left' }, [
          React.createElement('p', { key: 'side-hem' }, [
            React.createElement('span', { 
              key: 'side-hem-label',
              className: "font-medium" 
            }, 'Side Hem: '),
            BlindCalculations.formatMeasurement(3.8, units)
          ]),
          React.createElement('p', { key: 'bottom-hem' }, [
            React.createElement('span', { 
              key: 'bottom-hem-label',
              className: "font-medium" 
            }, 'Bottom Hem: '),
            BlindCalculations.formatMeasurement(30.5, units)
          ])
        ]),
        React.createElement('div', { key: 'construction-middle' }, [
          React.createElement('p', { key: 'weight-pocket' }, [
            React.createElement('span', { 
              key: 'weight-pocket-label',
              className: "font-medium" 
            }, 'Weight Pocket: '),
            BlindCalculations.formatMeasurement(2.8, units)
          ]),
          React.createElement('p', { key: 'top-hem' }, [
            React.createElement('span', { 
              key: 'top-hem-label',
              className: "font-medium" 
            }, 'Top Hem: '),
            BlindCalculations.formatMeasurement(2.5, units)
          ])
        ]),
        React.createElement('div', { key: 'construction-right' }, [
          React.createElement('p', { key: 'ring-spacing' }, [
            React.createElement('span', { 
              key: 'ring-spacing-label',
              className: "font-medium" 
            }, 'Ring Spacing: '),
            `~${BlindCalculations.formatSingleUnit(16, units)}`
          ]),
          React.createElement('p', { key: 'edge-to-ring' }, [
            React.createElement('span', { 
              key: 'edge-to-ring-label',
              className: "font-medium" 
            }, 'Edge to First Ring: '),
            BlindCalculations.formatMeasurement(2.5, units)
          ])
        ])
      ])
    ])
  ]);
};