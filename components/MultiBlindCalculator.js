// No need for Lucide icons, using emojis instead

const MultiBlindCalculator = ({ 
  blinds, 
  setBlinds, 
  units, 
  fabricWidth 
}) => {

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

  const multiBlindData = BlindCalculations.calculateMultiBlindRequirements(blinds, fabricWidth, units);

  return React.createElement('div', {
    key: 'multi-blind-calculator',
    className: "space-y-8 mb-8"
  }, [
    // Multiple Blind Dimensions
    React.createElement('div', {
      key: 'multi-dimensions',
      className: "bg-blue-50 p-6 rounded-lg"
    }, [
      React.createElement('div', {
        key: 'multi-header',
        className: "flex items-center justify-between mb-4"
      }, [        React.createElement('h3', {
          key: 'multi-title',
          className: "text-lg font-semibold flex items-center gap-2"
        }, `📏 Multiple Blind Dimensions (${blinds.length} blinds)`),
        React.createElement('div', {
          key: 'multi-controls',
          className: "flex gap-2"
        }, [
          blinds.length < 4 && React.createElement('button', {
            key: 'add-button',
            onClick: addBlind,
            className: "px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          }, '+ Add Blind'),
          blinds.length > 1 && React.createElement('button', {
            key: 'remove-button',
            onClick: removeBlind,
            className: "px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          }, '- Remove')
        ])
      ]),
      React.createElement('div', {
        key: 'multi-blinds',
        className: "space-y-6"
      }, blinds.map((blind, index) => 
        React.createElement('div', {
          key: `blind-${index}`,
          className: "bg-white p-4 rounded-lg border border-blue-200"
        }, [
          React.createElement('h4', {
            key: `blind-title-${index}`,
            className: "font-medium text-blue-800 mb-3"
          }, `Blind ${index + 1}`),
          React.createElement('div', {
            key: `blind-inputs-${index}`,
            className: "grid md:grid-cols-2 gap-4"
          }, [
            React.createElement('div', { key: `width-input-${index}` }, [
              React.createElement('label', {
                key: `width-label-${index}`,
                className: "block text-sm font-medium text-gray-700 mb-2"
              }, `Width ${units === 'metric' ? '(cm)' : '(inches)'}`),
              React.createElement('input', {
                key: `width-field-${index}`,
                type: "number",
                value: units === 'metric' ? blind.width : Math.round(blind.width / 2.54 * 10) / 10,
                onChange: (e) => updateBlind(index, 'width', units === 'metric' ? e.target.value : e.target.value * 2.54),
                min: units === 'metric' ? "30" : "12",
                max: units === 'metric' ? "300" : "120",
                step: units === 'metric' ? "1" : "0.1",
                className: "w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }),
              React.createElement('p', {
                key: `width-conversion-${index}`,
                className: "text-sm text-gray-500 mt-1"
              }, units === 'metric' ? `= ${BlindCalculations.cmToFeetInches(blind.width)}` : `= ${blind.width.toFixed(1)}cm`)
            ]),
            React.createElement('div', { key: `height-input-${index}` }, [
              React.createElement('label', {
                key: `height-label-${index}`,
                className: "block text-sm font-medium text-gray-700 mb-2"
              }, `Height ${units === 'metric' ? '(cm)' : '(inches)'}`),
              React.createElement('input', {
                key: `height-field-${index}`,
                type: "number",
                value: units === 'metric' ? blind.height : Math.round(blind.height / 2.54 * 10) / 10,
                onChange: (e) => updateBlind(index, 'height', units === 'metric' ? e.target.value : e.target.value * 2.54),
                min: units === 'metric' ? "50" : "20",
                max: units === 'metric' ? "400" : "160",
                step: units === 'metric' ? "1" : "0.1",
                className: "w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }),
              React.createElement('p', {
                key: `height-conversion-${index}`,
                className: "text-sm text-gray-500 mt-1"
              }, units === 'metric' ? `= ${BlindCalculations.cmToFeetInches(blind.height)}` : `= ${blind.height.toFixed(1)}cm`)
            ])
          ])
        ])
      ))
    ]),

    // Cutting Guide for Multiple Blinds
    React.createElement('div', {
      key: 'cutting-guide',
      className: "bg-green-50 p-6 rounded-lg"
    }, [
      React.createElement('h3', {
        key: 'cutting-title',
        className: "text-lg font-semibold mb-4 flex items-center gap-2"
      }, [

        'Cutting Guide for Each Blind'
      ]),
      React.createElement('div', {
        key: 'cutting-requirements',
        className: "space-y-4"
      }, multiBlindData.requirements.map((req, index) => 
        React.createElement('div', {
          key: `req-${index}`,
          className: "bg-white p-4 rounded-lg border border-green-200"
        }, [
          React.createElement('h4', {
            key: `req-title-${index}`,
            className: "font-medium text-green-800 mb-3"
          }, `Blind ${req.blindIndex} (${BlindCalculations.formatSingleUnit(req.originalWidth, units)} × ${BlindCalculations.formatSingleUnit(req.originalHeight, units)} finished)`),
          React.createElement('div', {
            key: `req-grid-${index}`,
            className: "grid md:grid-cols-2 gap-4"
          }, [
            React.createElement('div', { key: `face-${index}` }, [
              React.createElement('h5', {
                key: `face-title-${index}`,
                className: "font-medium text-gray-700 mb-2"
              }, 'Face Fabric'),
              React.createElement('p', {
                key: `face-cut-${index}`,
                className: "text-sm"
              }, [
                React.createElement('span', { 
                  key: `face-cut-label-${index}`,
                  className: "font-medium" 
                }, 'Cut: '),
                `${BlindCalculations.formatMeasurement(req.faceFabric.width, units)} × ${BlindCalculations.formatMeasurement(req.faceFabric.height, units)}`
              ])
            ]),
            React.createElement('div', { key: `lining-${index}` }, [
              React.createElement('h5', {
                key: `lining-title-${index}`,
                className: "font-medium text-gray-700 mb-2"
              }, 'Lining Fabric'),
              React.createElement('p', {
                key: `lining-cut-${index}`,
                className: "text-sm"
              }, [
                React.createElement('span', { 
                  key: `lining-cut-label-${index}`,
                  className: "font-medium" 
                }, 'Cut: '),
                `${BlindCalculations.formatMeasurement(req.lining.width, units)} × ${BlindCalculations.formatMeasurement(req.lining.height, units)}`
              ])
            ])
          ])
        ])
      ))
    ]),

    // Multi-Blind Shopping Guide
    React.createElement('div', {
      key: 'multi-shopping',
      className: "bg-purple-50 p-6 rounded-lg"
    }, [
      React.createElement('h3', {
        key: 'multi-shopping-title',
        className: "text-lg font-semibold mb-4 flex items-center gap-2"
      }, `🛒 Fabric Shopping Guide - ${blinds.length} Blinds`),
      
      React.createElement('div', {
        key: 'multi-shopping-grid',
        className: "grid md:grid-cols-2 gap-6"
      }, [
        React.createElement('div', {
          key: 'multi-face-purchase',
          className: "bg-white p-4 rounded-lg border border-purple-200"
        }, [
          React.createElement('h4', {
            key: 'multi-face-title',
            className: "font-medium text-purple-800 mb-3"
          }, 'Face Fabric Purchase'),
          
          !multiBlindData.shopping.faceFabric.fitsWidth && React.createElement('div', {
            key: 'multi-face-warning',
            className: "bg-red-100 border border-red-300 p-3 rounded-md mb-3"
          }, [
            React.createElement('p', {
              key: 'multi-face-warning-text',
              className: "text-red-800 text-sm font-medium"
            }, `⚠️ Required width (${BlindCalculations.formatSingleUnit(multiBlindData.shopping.faceFabric.requiredWidth, units)}) exceeds available fabric width (${BlindCalculations.formatSingleUnit(fabricWidth, units)})`)
          ]),
          
          React.createElement('div', {
            key: 'multi-face-details',
            className: "space-y-2 text-sm"
          }, [
            React.createElement('p', { key: 'multi-face-width' }, [
              React.createElement('span', { 
                key: 'multi-face-width-label',
                className: "font-medium" 
              }, 'Width Needed: '),
              BlindCalculations.formatSingleUnit(multiBlindData.shopping.faceFabric.requiredWidth, units)
            ]),
            React.createElement('p', { key: 'multi-face-length' }, [
              React.createElement('span', { 
                key: 'multi-face-length-label',
                className: "font-medium" 
              }, 'Total Length: '),
              BlindCalculations.formatPurchaseLength(multiBlindData.shopping.faceFabric.requiredLength, units)
            ]),
            React.createElement('div', {
              key: 'multi-face-buy',
              className: "mt-3 p-2 bg-purple-100 rounded"
            }, [
              React.createElement('p', {
                key: 'multi-face-buy-text',
                className: "font-medium text-purple-800"
              }, [
                React.createElement('strong', null, `Buy: ${BlindCalculations.formatPurchaseLength(multiBlindData.shopping.faceFabric.requiredLength, units)}`)
              ])
            ])
          ])
        ]),

        React.createElement('div', {
          key: 'multi-lining-purchase',
          className: "bg-white p-4 rounded-lg border border-purple-200"
        }, [
          React.createElement('h4', {
            key: 'multi-lining-title',
            className: "font-medium text-purple-800 mb-3"
          }, 'Lining Fabric Purchase'),
          
          React.createElement('div', {
            key: 'multi-lining-details',
            className: "space-y-2 text-sm"
          }, [
            React.createElement('p', { key: 'multi-lining-width' }, [
              React.createElement('span', { 
                key: 'multi-lining-width-label',
                className: "font-medium" 
              }, 'Width Needed: '),
              BlindCalculations.formatSingleUnit(multiBlindData.shopping.lining.requiredWidth, units)
            ]),
            React.createElement('p', { key: 'multi-lining-length' }, [
              React.createElement('span', { 
                key: 'multi-lining-length-label',
                className: "font-medium" 
              }, 'Total Length: '),
              BlindCalculations.formatPurchaseLength(multiBlindData.shopping.lining.requiredLength, units)
            ]),
            React.createElement('div', {
              key: 'multi-lining-buy',
              className: "mt-3 p-2 bg-purple-100 rounded"
            }, [
              React.createElement('p', {
                key: 'multi-lining-buy-text',
                className: "font-medium text-purple-800"
              }, [
                React.createElement('strong', null, `Buy: ${BlindCalculations.formatPurchaseLength(multiBlindData.shopping.lining.requiredLength, units)}`)
              ])
            ])
          ])
        ])
      ]),

      React.createElement('div', {
        key: 'multi-shopping-list',
        className: "mt-6 bg-white p-4 rounded-lg border-2 border-purple-300"
      }, [
        React.createElement('h4', {
          key: 'shopping-list-title',
          className: "font-bold text-purple-900 mb-2"
        }, `🛒 Shopping List (${blinds.length} Blinds)`),
        React.createElement('div', {
          key: 'shopping-list-items',
          className: "text-sm space-y-1"
        }, [
          React.createElement('p', { key: 'shopping-face' }, [
            '• ',
            React.createElement('span', { 
              key: 'shopping-face-label',
              className: "font-medium" 
            }, 'Face Fabric: '),
            `${BlindCalculations.formatPurchaseLength(multiBlindData.shopping.faceFabric.requiredLength, units)} at ${BlindCalculations.formatSingleUnit(fabricWidth, units)} width`
          ]),
          React.createElement('p', { key: 'shopping-lining' }, [
            '• ',
            React.createElement('span', { 
              key: 'shopping-lining-label',
              className: "font-medium" 
            }, 'Lining Fabric: '),
            `${BlindCalculations.formatPurchaseLength(multiBlindData.shopping.lining.requiredLength, units)} at ${BlindCalculations.formatSingleUnit(fabricWidth, units)} width`
          ])
        ])
      ])
    ]),

    // Ring Placement for Multiple Blinds
    React.createElement('div', {
      key: 'multi-ring-placement',
      className: "bg-gray-50 p-6 rounded-lg"
    }, [
      React.createElement('h3', {
        key: 'multi-ring-title',
        className: "text-lg font-semibold mb-4"
      }, '📍 Ring Placement Layout - All Blinds'),
      
      React.createElement('div', {
        key: 'multi-ring-blinds',
        className: "space-y-8"
      }, blinds.map((blind, index) => {
        const ringData = BlindCalculations.getBlindRingData(blind.width, blind.height);
        return React.createElement('div', {
          key: `ring-blind-${index}`,
          className: "bg-white p-4 rounded-lg border border-gray-200"
        }, [
          React.createElement('h4', {
            key: `ring-blind-title-${index}`,
            className: "font-medium text-gray-800 mb-4"
          }, `Blind ${index + 1} - Ring Layout (${BlindCalculations.formatSingleUnit(blind.width, units)} × ${BlindCalculations.formatSingleUnit(blind.height, units)})`),
          
          // Ring Summary
          React.createElement('div', {
            key: `ring-summary-${index}`,
            className: "grid md:grid-cols-3 gap-4 mb-4 text-sm"
          }, [
            React.createElement('div', { key: `summary-left-${index}` }, [
              React.createElement('p', { key: `ring-columns-${index}` }, [
                React.createElement('span', { 
                  key: `ring-columns-label-${index}`,
                  className: "font-medium" 
                }, 'Ring Columns: '),
                ringData.ringRows
              ]),
              React.createElement('p', { key: `ring-rows-${index}` }, [
                React.createElement('span', { 
                  key: `ring-rows-label-${index}`,
                  className: "font-medium" 
                }, 'Ring Rows: '),
                ringData.verticalRings
              ])
            ]),
            React.createElement('div', { key: `summary-middle-${index}` }, [
              React.createElement('p', { key: `total-rings-${index}` }, [
                React.createElement('span', { 
                  key: `total-rings-label-${index}`,
                  className: "font-medium" 
                }, 'Total Rings: '),
                `${ringData.totalRings} pieces`
              ]),
              React.createElement('p', { key: `screw-eyes-${index}` }, [
                React.createElement('span', { 
                  key: `screw-eyes-label-${index}`,
                  className: "font-medium" 
                }, 'Screw Eyes: '),
                `${ringData.ringRows} pieces`
              ])
            ]),
            React.createElement('div', { key: `summary-right-${index}` }, [
              React.createElement('p', { key: `total-cord-${index}` }, [
                React.createElement('span', { 
                  key: `total-cord-label-${index}`,
                  className: "font-medium" 
                }, 'Total Cord: '),
                BlindCalculations.formatMeasurement(Math.round(ringData.cordLengths.reduce((a, b) => a + b, 0) / 100) * 100, units)
              ])
            ])
          ]),

          // Horizontal Positions
          React.createElement('div', {
            key: `horizontal-positions-${index}`,
            className: "mb-4"
          }, [
            React.createElement('h5', {
              key: `horizontal-title-${index}`,
              className: "font-medium mb-2"
            }, 'Horizontal Ring Positions (from left edge):'),
            React.createElement('div', {
              key: `position-tags-${index}`,
              className: "flex flex-wrap gap-2"
            }, ringData.ringPositions.map((pos, colIndex) => 
              React.createElement('span', {
                key: `pos-${index}-${colIndex}`,
                className: "bg-blue-100 px-2 py-1 rounded text-sm"
              }, `Col ${colIndex + 1}: ${BlindCalculations.formatMeasurement(Math.round(pos * 10) / 10, units)}`)
            ))
          ]),

          // Visual Ring Layout
          React.createElement('div', {
            key: `visual-layout-${index}`,
            className: "border border-dashed border-gray-300 p-3 bg-gray-50 rounded"
          }, [
            React.createElement('div', {
              key: `visual-title-${index}`,
              className: "text-center text-xs text-gray-600 mb-2"
            }, `Visual Ring Layout - Blind ${index + 1}`),
            React.createElement('div', {
              key: `visual-grid-${index}`,
              className: "font-mono text-xs"
            }, Array.from({ length: ringData.verticalRings }, (_, row) => 
              React.createElement('div', {
                key: `visual-row-${index}-${row}`,
                className: "flex justify-between items-center py-1"
              }, [
                React.createElement('span', {
                  key: `visual-height-${index}-${row}`,
                  className: "text-gray-500 w-12 text-xs"
                }, `${BlindCalculations.formatSingleUnit((ringData.verticalRings - 1 - row) * 20, units)}:`),
                React.createElement('div', {
                  key: `visual-rings-${index}-${row}`,
                  className: "flex-1 flex justify-around mx-2"
                }, ringData.ringPositions.map((_, col) => 
                  React.createElement('span', {
                    key: `visual-ring-${index}-${row}-${col}`,
                    className: "text-blue-600"
                  }, '○')
                )),
                React.createElement('span', {
                  key: `visual-row-num-${index}-${row}`,
                  className: "text-gray-400 w-8 text-xs text-right"
                }, `R${ringData.verticalRings - row}`)
              ])
            ))
          ]),

          // Cord Lengths for this blind
          React.createElement('div', {
            key: `cord-lengths-${index}`,
            className: "mt-4"
          }, [
            React.createElement('h5', {
              key: `cord-title-${index}`,
              className: "font-medium mb-2"
            }, 'Cord Lengths (Right-hand Draw):'),
            React.createElement('div', {
              key: `cord-grid-${index}`,
              className: "grid grid-cols-2 md:grid-cols-4 gap-2"
            }, ringData.cordLengths.map((length, colIndex) => 
              React.createElement('div', {
                key: `cord-${index}-${colIndex}`,
                className: "text-center"
              }, [
                React.createElement('div', {
                  key: `cord-box-${index}-${colIndex}`,
                  className: "bg-orange-100 p-2 rounded text-sm"
                }, [
                  React.createElement('div', {
                    key: `cord-col-${index}-${colIndex}`,
                    className: "font-medium"
                  }, `Col ${colIndex + 1}`),
                  React.createElement('div', {
                    key: `cord-length-${index}-${colIndex}`,
                    className: "text-xs"
                  }, BlindCalculations.formatSingleUnit(length, units))
                ])
              ])
            ))
          ])
        ]);
      })),

      // Combined Hardware Summary
      React.createElement('div', {
        key: 'combined-hardware',
        className: "mt-6 bg-blue-50 p-4 rounded-lg"
      }, [
        React.createElement('h4', {
          key: 'combined-title',
          className: "font-medium text-blue-800 mb-3"
        }, `🔧 Combined Hardware Summary (${blinds.length} Blinds)`),
        React.createElement('div', {
          key: 'combined-grid',
          className: "grid md:grid-cols-2 gap-4 text-sm"
        }, [
          React.createElement('div', { key: 'combined-left' }, [
            React.createElement('p', { key: 'combined-rings' }, [
              React.createElement('span', { 
                key: 'combined-rings-label',
                className: "font-medium" 
              }, 'Total Rings Needed: '),
              `${blinds.reduce((total, blind) => total + BlindCalculations.getBlindRingData(blind.width, blind.height).totalRings, 0)} pieces`
            ]),
            React.createElement('p', { key: 'combined-screws' }, [
              React.createElement('span', { 
                key: 'combined-screws-label',
                className: "font-medium" 
              }, 'Total Screw Eyes: '),
              `${blinds.reduce((total, blind) => total + BlindCalculations.getBlindRingData(blind.width, blind.height).ringRows, 0)} pieces`
            ])
          ]),
          React.createElement('div', { key: 'combined-right' }, [
            React.createElement('p', { key: 'combined-cord' }, [
              React.createElement('span', { 
                key: 'combined-cord-label',
                className: "font-medium" 
              }, 'Total Cord Length: '),
              BlindCalculations.formatMeasurement(Math.round(blinds.reduce((total, blind) => {
                const cordLengths = BlindCalculations.getCordLengthsForBlind(blind.width, blind.height);
                return total + cordLengths.reduce((sum, length) => sum + length, 0);
              }, 0) / 100) * 100, units)
            ]),
            React.createElement('p', { key: 'combined-boards' }, [
              React.createElement('span', { 
                key: 'combined-boards-label',
                className: "font-medium" 
              }, 'Mounting Boards: '),
              `${blinds.length} pieces (various lengths)`
            ])
          ])
        ])
      ])
    ])
  ]);
};