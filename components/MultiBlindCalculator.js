// MultiBlindCalculator.js
const MultiBlindCalculator = ({ 
  blinds, 
  setBlinds, 
  units, 
  fabricWidth 
}) => {
  // Get Lucide icons
  const { Ruler, ShoppingCart, Scissors, Package } = lucideReact;
  
  const addBlind = () => {
    if (blinds.length < 10) {
      setBlinds([...blinds, { width: 80, height: 160, name: `Blind ${blinds.length + 1}` }]);
    }
  };

  const removeBlind = () => {
    if (blinds.length > 1) {
      setBlinds(blinds.slice(0, -1));
    }
  };

  const updateBlind = (index, field, value) => {
    const newBlinds = [...blinds];
    if (field === 'name') {
      // For name field, store as string
      newBlinds[index][field] = value;
    } else {
      // For numeric fields, convert to number
      newBlinds[index][field] = Number(value);
    }
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
      }, [      React.createElement('div', {
        key: 'multi-header-container',
        className: "flex flex-col md:flex-row md:items-center md:justify-between mb-4"
      }, [
        React.createElement('h3', {
          key: 'multi-title',
          className: "text-lg font-semibold flex items-center gap-2 mb-3 md:mb-0"
        }, [
          React.createElement(Ruler, {
            key: 'ruler-icon',
            className: "text-blue-600",
            size: 20
          }),
          `Multiple Blind Dimensions (${blinds.length} blinds)`
        ]),
        
        // Fabric width control
        React.createElement('div', {
          key: 'fabric-width-control',
          className: "flex items-end gap-3"
        }, [
          React.createElement('div', null, [
            React.createElement('label', {
              className: "block text-sm font-medium text-gray-700 mb-1"
            }, `Fabric Width ${units === 'metric' ? '(cm)' : '(inches)'}`),
            React.createElement('input', {
              type: "number",
              value: units === 'metric' ? fabricWidth : Math.round(fabricWidth / 2.54 * 10) / 10,
              onChange: (e) => setFabricWidth(units === 'metric' ? Number(e.target.value) : Number(e.target.value) * 2.54),
              min: units === 'metric' ? "90" : "36",
              max: units === 'metric' ? "300" : "120",
              className: "w-24 p-2 border border-gray-300 rounded-md"
            })
          ]),
          React.createElement('p', {
            className: "text-sm text-gray-500"
          }, units === 'metric' ? `= ${BlindCalculations.cmToFeetInches(fabricWidth)}` : `= ${fabricWidth.toFixed(1)}cm`)
        ])
      ]),
        React.createElement('div', {
          key: 'multi-controls',
          className: "flex gap-2"
        }, [
          blinds.length < 10 && React.createElement('button', {
            key: 'add-button',
            onClick: addBlind,
            className: "px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
          }, "+ Add Blind"),
          blinds.length > 1 && React.createElement('button', {
            key: 'remove-button',
            onClick: removeBlind,
            className: "px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
          }, "- Remove")
        ])
      ]),
      React.createElement('div', {
        key: 'blinds-inputs',
        className: "space-y-6"
      }, blinds.map((blind, index) => 
        React.createElement('div', {
          key: `blind-${index}`,
          className: "bg-white p-4 rounded-lg border border-blue-200"
        }, [
          React.createElement('h4', {
            key: `blind-${index}-title`,
            className: "font-medium text-blue-800 mb-3 flex items-center justify-between"
          }, [
            `Blind ${index + 1}`,
            React.createElement('span', {
              key: `blind-${index}-id`,
              className: "text-xs bg-blue-100 px-2 py-1 rounded-full text-blue-700"
            }, `#${index + 1}`)
          ]),
          
          // Name input field
          React.createElement('div', {
            key: `blind-${index}-name-container`,
            className: "mb-4"
          }, [
            React.createElement('label', {
              key: `blind-${index}-name-label`,
              className: "block text-sm font-medium text-gray-700 mb-2"
            }, "Blind Name (for reference)"),
            React.createElement('input', {
              key: `blind-${index}-name-input`,
              type: "text",
              value: blind.name || `Blind ${index + 1}`,
              onChange: (e) => updateBlind(index, 'name', e.target.value),
              placeholder: `Blind ${index + 1}`,
              className: "w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            }),
            React.createElement('p', {
              key: `blind-${index}-name-hint`,
              className: "text-sm text-gray-500 mt-1"
            }, "E.g. Living Room, Kitchen, Bedroom Window, etc.")
          ]),
          
          React.createElement('div', {
            key: `blind-${index}-inputs`,
            className: "grid md:grid-cols-2 gap-4"
          }, [
            React.createElement('div', {
              key: `blind-${index}-width`
            }, [
              React.createElement('label', {
                key: `blind-${index}-width-label`,
                className: "block text-sm font-medium text-gray-700 mb-2"
              }, `Width ${units === 'metric' ? '(cm)' : '(inches)'}`),
              React.createElement('input', {
                key: `blind-${index}-width-input`,
                type: "number",
                value: units === 'metric' ? blind.width : Math.round(blind.width / 2.54 * 10) / 10,
                onChange: (e) => updateBlind(index, 'width', units === 'metric' ? e.target.value : e.target.value * 2.54),
                min: units === 'metric' ? "30" : "12",
                max: units === 'metric' ? "300" : "120",
                step: units === 'metric' ? "1" : "0.1",
                className: "w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }),
              React.createElement('p', {
                key: `blind-${index}-width-conversion`,
                className: "text-sm text-gray-500 mt-1"
              }, units === 'metric' ? `= ${BlindCalculations.cmToFeetInches(blind.width)}` : `= ${blind.width.toFixed(1)}cm`)
            ]),
            React.createElement('div', {
              key: `blind-${index}-height`
            }, [
              React.createElement('label', {
                key: `blind-${index}-height-label`,
                className: "block text-sm font-medium text-gray-700 mb-2"
              }, `Height ${units === 'metric' ? '(cm)' : '(inches)'}`),
              React.createElement('input', {
                key: `blind-${index}-height-input`,
                type: "number",
                value: units === 'metric' ? blind.height : Math.round(blind.height / 2.54 * 10) / 10,
                onChange: (e) => updateBlind(index, 'height', units === 'metric' ? e.target.value : e.target.value * 2.54),
                min: units === 'metric' ? "50" : "20",
                max: units === 'metric' ? "400" : "160",
                step: units === 'metric' ? "1" : "0.1",
                className: "w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              }),
              React.createElement('p', {
                key: `blind-${index}-height-conversion`,
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
        React.createElement(Scissors, {
          key: 'scissors-icon',
          className: "text-green-600",
          size: 20
        }),
        'Cutting Guide for Each Blind'
      ]),
      React.createElement('div', {
        key: 'cutting-guide-list',
        className: "space-y-4"
      }, multiBlindData.requirements.map((req, index) => 
        React.createElement('div', {
          key: `cutting-${index}`,
          className: "bg-white p-4 rounded-lg border border-green-200"
        }, [
          React.createElement('h4', {
            key: `cutting-${index}-title`,
            className: "font-medium text-green-800 mb-3"
          }, [
            React.createElement('span', null, `${blinds[req.blindIndex-1].name || `Blind ${req.blindIndex}`}`),
            React.createElement('span', { className: "text-xs bg-green-100 px-2 py-1 rounded-full text-green-700 ml-2" }, `#${req.blindIndex}`),
            React.createElement('span', { className: "block text-sm font-normal mt-1" }, 
              `(${BlindCalculations.formatSingleUnit(req.originalWidth, units)} × ${BlindCalculations.formatSingleUnit(req.originalHeight, units)} finished)`
            )
          ]),
          React.createElement('div', {
            key: `cutting-${index}-details`,
            className: "grid md:grid-cols-2 gap-4"
          }, [
            React.createElement('div', {
              key: `cutting-${index}-face`,
              className: "space-y-1"
            }, [
              React.createElement('p', {
                key: `cutting-${index}-face-title`,
                className: "font-medium"
              }, 'Face Fabric:'),
              React.createElement('p', {
                key: `cutting-${index}-face-dimensions`,
                className: "text-sm"
              }, `Cut ${BlindCalculations.formatSingleUnit(req.faceFabric.width, units)} × ${BlindCalculations.formatSingleUnit(req.faceFabric.height, units)}`)
            ]),
            React.createElement('div', {
              key: `cutting-${index}-lining`,
              className: "space-y-1"
            }, [
              React.createElement('p', {
                key: `cutting-${index}-lining-title`,
                className: "font-medium"
              }, 'Lining:'),
              React.createElement('p', {
                key: `cutting-${index}-lining-dimensions`,
                className: "text-sm"
              }, `Cut ${BlindCalculations.formatSingleUnit(req.lining.width, units)} × ${BlindCalculations.formatSingleUnit(req.lining.height, units)}`)
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
      }, [
        React.createElement(ShoppingCart, {
          key: 'cart-icon',
          className: "text-purple-600",
          size: 20
        }),
        `Fabric Shopping Guide - ${blinds.length} Blinds`
      ]),
      
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
            }, `⚠️ Width needed (${BlindCalculations.formatSingleUnit(multiBlindData.shopping.faceFabric.requiredWidth, units)}) exceeds available (${BlindCalculations.formatSingleUnit(fabricWidth, units)})`)
          ]),
          
          React.createElement('div', {
            key: 'multi-face-details',
            className: "space-y-2 text-sm"
          }, [
            React.createElement('p', null, [
              React.createElement('span', { className: "font-medium" }, 'Maximum Width: '),
              BlindCalculations.formatSingleUnit(multiBlindData.shopping.faceFabric.requiredWidth, units)
            ]),
            React.createElement('p', null, [
              React.createElement('span', { className: "font-medium" }, 'Total Length: '),
              BlindCalculations.formatPurchaseLength(multiBlindData.shopping.faceFabric.requiredLength, units)
            ]),
            React.createElement('div', {
              key: 'multi-face-buy-box',
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
          
          !multiBlindData.shopping.lining.fitsWidth && React.createElement('div', {
            key: 'multi-lining-warning',
            className: "bg-red-100 border border-red-300 p-3 rounded-md mb-3"
          }, [
            React.createElement('p', {
              key: 'multi-lining-warning-text',
              className: "text-red-800 text-sm font-medium"
            }, `⚠️ Width needed (${BlindCalculations.formatSingleUnit(multiBlindData.shopping.lining.requiredWidth, units)}) exceeds available (${BlindCalculations.formatSingleUnit(fabricWidth, units)})`)
          ]),
          
          React.createElement('div', {
            key: 'multi-lining-details',
            className: "space-y-2 text-sm"
          }, [
            React.createElement('p', null, [
              React.createElement('span', { className: "font-medium" }, 'Maximum Width: '),
              BlindCalculations.formatSingleUnit(multiBlindData.shopping.lining.requiredWidth, units)
            ]),
            React.createElement('p', null, [
              React.createElement('span', { className: "font-medium" }, 'Total Length: '),
              BlindCalculations.formatPurchaseLength(multiBlindData.shopping.lining.requiredLength, units)
            ]),
            React.createElement('div', {
              key: 'multi-lining-buy-box',
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
        key: 'shopping-list-summary',
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
          React.createElement('p', null, [
            React.createElement('span', { className: "font-medium" }, 'Face Fabric: '),
            BlindCalculations.formatPurchaseLength(multiBlindData.shopping.faceFabric.requiredLength, units),
            `, at least ${BlindCalculations.formatSingleUnit(multiBlindData.shopping.faceFabric.requiredWidth, units)} wide`
          ]),
          React.createElement('p', null, [
            React.createElement('span', { className: "font-medium" }, 'Lining Fabric: '),
            BlindCalculations.formatPurchaseLength(multiBlindData.shopping.lining.requiredLength, units),
            `, at least ${BlindCalculations.formatSingleUnit(multiBlindData.shopping.lining.requiredWidth, units)} wide`
          ])
        ])
      ])
    ]),

    // Ring Placement for Multiple Blinds
    React.createElement('div', {
      key: 'ring-placement',
      className: "bg-gray-50 p-6 rounded-lg"
    }, [
      React.createElement('h3', {
        key: 'ring-placement-title',
        className: "text-lg font-semibold mb-4"
      }, '📍 Ring Placement Layout - All Blinds'),
      
      React.createElement('div', {
        key: 'ring-placement-blinds',
        className: "space-y-8"
      }, blinds.map((blind, index) => {
        const blindRingData = BlindCalculations.getBlindRingData(blind.width, blind.height);
        
        return React.createElement('div', {
          key: `blind-rings-${index}`,
          className: "bg-white p-4 rounded-lg border border-gray-200"
        }, [
          React.createElement('h4', {
            key: `blind-rings-title-${index}`,
            className: "font-medium text-gray-800 mb-3"
          }, [
            React.createElement('span', null, `${blind.name || `Blind ${index + 1}`} - Ring Layout`),
            React.createElement('span', { className: "text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700 ml-2" }, `#${index + 1}`)
          ]),
          React.createElement('div', {
            key: `blind-rings-details-${index}`,
            className: "mb-3 text-sm"
          }, [
            React.createElement('p', null, `${blindRingData.totalRings} rings total (${blindRingData.ringRows} columns × ${blindRingData.verticalRings} rows)`),
            React.createElement('p', {
              className: "mt-2 font-medium"
            }, 'Horizontal positions from left edge:'),
            React.createElement('div', {
              className: "flex flex-wrap gap-2 mt-1"
            }, blindRingData.ringPositions.map((pos, posIdx) => 
              React.createElement('span', {
                key: `blind-${index}-pos-${posIdx}`,
                className: "px-2 py-1 bg-blue-100 rounded"
              }, BlindCalculations.formatSingleUnit(pos, units))
            ))
          ]),
          React.createElement('div', {
            key: `blind-rings-visual-${index}`,
            className: "border border-gray-200 bg-gray-50",
            style: {
              height: '100px',
              position: 'relative'
            }
          }, [
            // Visual representation of rings
            ...blindRingData.ringPositions.map((xPos, colIdx) => {
              const verticalPositions = [];
              const verticalSpacing = blind.height / (blindRingData.verticalRings + 1);
              
              for (let rowIdx = 1; rowIdx <= blindRingData.verticalRings; rowIdx++) {
                verticalPositions.push(rowIdx * verticalSpacing);
              }

              return verticalPositions.map((yPos, rowIdx) => 
                React.createElement('div', {
                  key: `blind-${index}-ring-${colIdx}-${rowIdx}`,
                  className: "absolute w-2 h-2 bg-blue-600 rounded-full transform -translate-x-1/2 -translate-y-1/2",
                  style: {
                    left: `${(xPos / blind.width) * 100}%`,
                    top: `${(yPos / blind.height) * 100}%`
                  }
                })
              );
            }).flat()
          ])
        ])
      })),

      // Hardware & Supplies for Individual Blinds
      React.createElement('div', {
        key: 'hardware-details',
        className: "mt-6"
      }, [
        React.createElement('h4', {
          key: 'hardware-details-title',
          className: "font-medium text-gray-800 mb-3 flex items-center gap-2"
        }, [
          React.createElement(Package, {
            key: 'package-icon-details',
            className: "text-gray-600",
            size: 18
          }),
          'Hardware & Supplies - Individual Blinds'
        ]),
        React.createElement('div', {
          key: 'hardware-blinds-list',
          className: "space-y-4"
        }, blinds.map((blind, index) => {
          const calculations = BlindCalculations.getBlindCalculations(blind.width, blind.height);
          return React.createElement('div', {
            key: `blind-hardware-${index}`,
            className: "bg-white p-3 rounded-lg border border-gray-200"
          }, [
            React.createElement('h5', {
              key: `blind-hardware-title-${index}`,
              className: "font-medium text-gray-700 mb-2"
            }, [
              React.createElement('span', null, `${blind.name || `Blind ${index + 1}`} Hardware`),
              React.createElement('span', { className: "text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-700 ml-2" }, `#${index + 1}`)
            ]),
            React.createElement('div', {
              key: `blind-hardware-details-${index}`,
              className: "grid md:grid-cols-2 gap-2 text-sm"
            }, [
              React.createElement('p', null, [
                React.createElement('span', { className: "font-medium" }, 'Rings: '),
                `${calculations.ringRows * calculations.verticalRings} rings (${calculations.ringRows} columns × ${calculations.verticalRings} rows)`
              ]),
              React.createElement('p', null, [
                React.createElement('span', { className: "font-medium" }, 'Mounting Board: '),
                BlindCalculations.formatSingleUnit(calculations.mountingBoardLength, units)
              ]),
              React.createElement('p', null, [
                React.createElement('span', { className: "font-medium" }, 'Weight Rod: '),
                BlindCalculations.formatSingleUnit(calculations.weightRodLength, units)
              ]),
              React.createElement('p', null, [
                React.createElement('span', { className: "font-medium" }, 'Screw Eyes: '),
                `${calculations.ringRows} pieces (1 for each column)`
              ]),
              React.createElement('p', null, [
                React.createElement('span', { className: "font-medium" }, 'Cord Control: '),
                '1 tension lock (recommended) or cord cleat'
              ]),
              React.createElement('p', null, [
                React.createElement('span', { className: "font-medium" }, 'Cord Cleats: '),
                blind.width < 100 ? '1 piece (optional)' : '2 pieces (optional)'
              ])
            ])
          ]);
        }))
      ]),
      
      // Combined Hardware Summary
      React.createElement('div', {
        key: 'combined-hardware',
        className: "mt-6 bg-blue-50 p-4 rounded-lg"
      }, [
        React.createElement('h4', {
          key: 'combined-hardware-title',
          className: "font-medium text-blue-800 mb-3"
        }, `🔧 Combined Hardware Summary (${blinds.length} Blinds)`),
        React.createElement('div', {
          key: 'combined-hardware-grid',
          className: "grid md:grid-cols-2 gap-4 text-sm"
        }, [
          React.createElement('p', null, [
            React.createElement('span', { className: "font-medium" }, 'Total Rings: '),
            blinds.reduce((sum, blind) => {
              const data = BlindCalculations.getBlindRingData(blind.width, blind.height);
              return sum + data.totalRings;
            }, 0),
            ' pieces'
          ]),
          React.createElement('p', null, [
            React.createElement('span', { className: "font-medium" }, 'Mounting Boards: '),
            blinds.reduce((sum, blind) => sum + 1, 0),
            ' pieces, total length: ',
            BlindCalculations.formatSingleUnit(blinds.reduce((sum, blind) => {
              const calculations = BlindCalculations.getBlindCalculations(blind.width, blind.height);
              return sum + calculations.mountingBoardLength;
            }, 0), units)
          ]),
          React.createElement('p', null, [
            React.createElement('span', { className: "font-medium" }, 'Weight Rods: '),
            blinds.reduce((sum, blind) => sum + 1, 0),
            ' pieces, total length: ',
            BlindCalculations.formatSingleUnit(blinds.reduce((sum, blind) => {
              const calculations = BlindCalculations.getBlindCalculations(blind.width, blind.height);
              return sum + calculations.weightRodLength;
            }, 0), units)
          ]),
          React.createElement('p', null, [
            React.createElement('span', { className: "font-medium" }, 'Screw Eyes: '),
            blinds.reduce((sum, blind) => {
              const calculations = BlindCalculations.getBlindCalculations(blind.width, blind.height);
              return sum + calculations.ringRows;
            }, 0),
            ' pieces'
          ]),
          React.createElement('p', null, [
            React.createElement('span', { className: "font-medium" }, 'Tension Locks: '),
            blinds.length,
            ' pieces (recommended for safety)'
          ]),
          React.createElement('p', null, [
            React.createElement('span', { className: "font-medium" }, 'Cord Cleats: '),
            blinds.reduce((sum, blind) => sum + (blind.width < 100 ? 1 : 2), 0),
            ' pieces (optional if using tension locks)'
          ]),
          React.createElement('p', {
            colSpan: 2,
            className: "md:col-span-2 bg-blue-100 p-2 rounded mt-2"
          }, [
            React.createElement('span', { className: "font-medium" }, '💡 Tip: '),
            'Consider ordering extra hardware and supplies (5-10% more) to account for any mistakes or future repairs. Tension locks are recommended over cord cleats for child safety.'
          ])
        ])
      ])
    ]),

    // Cord Lengths for Multiple Blinds
    React.createElement('div', {
      key: 'multi-cord-lengths',
      className: "bg-orange-50 p-6 rounded-lg mb-8"
    }, [
      React.createElement('h3', {
        key: 'multi-cord-title',
        className: "text-lg font-semibold mb-4"
      }, '🧵 Cord Lengths - All Blinds (Right-hand Draw)'),
      
      React.createElement('div', {
        key: 'multi-cord-blinds',
        className: "space-y-8"
      }, blinds.map((blind, index) => {
        const cordLengths = BlindCalculations.getCordLengthsForBlind(blind.width, blind.height);
        const totalCordLength = cordLengths.reduce((sum, length) => sum + length, 0);
        
        return React.createElement('div', {
          key: `blind-cords-${index}`,
          className: "bg-white p-4 rounded-lg border border-orange-200"
        }, [
          React.createElement('h4', {
            key: `blind-cords-title-${index}`,
            className: "font-medium text-orange-800 mb-3"
          }, [
            React.createElement('span', null, `${blind.name || `Blind ${index + 1}`} - Cord Lengths`),
            React.createElement('span', { className: "text-xs bg-orange-100 px-2 py-1 rounded-full text-orange-700 ml-2" }, `#${index + 1}`)
          ]),
          
          React.createElement('div', {
            key: `blind-cords-grid-${index}`,
            className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"
          }, cordLengths.map((length, cordIdx) => 
            React.createElement('div', {
              key: `blind-${index}-cord-${cordIdx}`,
              className: "p-2 bg-orange-50 rounded-lg border border-orange-100"
            }, [
              React.createElement('p', {
                key: `blind-${index}-cord-${cordIdx}-title`,
                className: "font-medium text-orange-800 text-sm"
              }, `Cord ${cordIdx + 1}`),
              React.createElement('p', {
                key: `blind-${index}-cord-${cordIdx}-length`,
                className: "text-sm"
              }, BlindCalculations.formatSingleUnit(length, units))
            ])
          )),
          
          React.createElement('div', {
            key: `blind-${index}-cord-total`,
            className: "mt-3 p-2 bg-orange-100 rounded"
          }, [
            React.createElement('p', {
              key: `blind-${index}-cord-total-text`,
              className: "font-medium"
            }, [
              `Total cord for ${blind.name || `Blind ${index + 1}`}: `,
              React.createElement('strong', {
                key: `blind-${index}-cord-total-strong`
              }, BlindCalculations.formatSingleUnit(totalCordLength, units))
            ])
          ]),
          
          React.createElement('p', {
            key: `blind-${index}-cord-note`,
            className: "text-xs text-gray-600 mt-2"
          }, 'Cords are numbered left to right. First cord (leftmost) is the longest.')
        ]);
      })),
      
      // Combined Cord Summary
      React.createElement('div', {
        key: 'combined-cord-summary',
        className: "mt-6 bg-orange-200 p-4 rounded-lg"
      }, [
        React.createElement('h4', {
          key: 'combined-cord-title',
          className: "font-medium text-orange-900 mb-3"
        }, `🧵 Combined Cord Summary (${blinds.length} Blinds)`),
        React.createElement('div', {
          key: 'combined-cord-total',
          className: "text-lg font-medium text-center"
        }, [
          'Total cord needed: ',
          React.createElement('strong', {
            key: 'combined-cord-total-strong',
            className: "text-orange-900"
          }, BlindCalculations.formatSingleUnit(blinds.reduce((sum, blind) => {
            const cordLengths = BlindCalculations.getCordLengthsForBlind(blind.width, blind.height);
            return sum + cordLengths.reduce((cordSum, length) => cordSum + length, 0);
          }, 0), units))
        ]),
        React.createElement('p', {
          key: 'cord-recommendation',
          className: "text-sm text-center text-orange-800 mt-2"
        }, 'Recommendation: Buy an extra 10-15% cord length for safety margin')
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
      
      // Common construction measurements that apply to all blinds
      React.createElement('div', {
        key: 'common-construction',
        className: "mb-5"
      }, [
        React.createElement('h4', {
          key: 'common-title',
          className: "font-medium text-indigo-800 mb-3"
        }, 'Common Construction Details (All Blinds)'),
        React.createElement('div', {
          key: 'common-grid',
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
            key: 'materials-info',
            className: "p-3 bg-white rounded border border-indigo-200"
          }, [
            React.createElement('h4', {
              key: 'materials-title',
              className: "font-medium text-indigo-800 mb-1"
            }, 'Materials'),
            React.createElement('p', { key: 'materials-rings' }, 'Rings: Plastic or metal rings, ~1cm diameter'),
            React.createElement('p', { key: 'materials-cord' }, 'Cord: Nylon or polyester blind cord, ~2mm diameter'),
            React.createElement('p', { key: 'materials-weights' }, 'Weight rods: ~8mm diameter metal or plastic rod')
          ])
        ])
      ]),
      
      // Individual blinds ring spacing
      React.createElement('div', {
        key: 'individual-spacing',
        className: "mb-5"
      }, [
        React.createElement('h4', {
          key: 'spacing-title',
          className: "font-medium text-indigo-800 mb-3"
        }, 'Ring Spacing - Individual Blinds'),
        React.createElement('div', {
          key: 'spacing-grid',
          className: "grid md:grid-cols-2 gap-4"
        }, blinds.map((blind, index) => {
          const calculations = BlindCalculations.getBlindCalculations(blind.width, blind.height);
          return React.createElement('div', {
            key: `blind-spacing-${index}`,
            className: "p-3 bg-white rounded border border-indigo-200"
          }, [
            React.createElement('h5', {
              key: `blind-spacing-title-${index}`,
              className: "font-medium text-indigo-700 mb-2"
            }, [
              React.createElement('span', null, `${blind.name || `Blind ${index + 1}`}`),
              React.createElement('span', { className: "text-xs bg-indigo-100 px-2 py-1 rounded-full text-indigo-700 ml-2" }, `#${index + 1}`),
              React.createElement('span', { className: "block text-sm font-normal mt-1" }, 
                `(${BlindCalculations.formatSingleUnit(blind.width, units)} × ${BlindCalculations.formatSingleUnit(blind.height, units)})`
              )
            ]),
            React.createElement('p', { key: `spacing-horizontal-${index}` }, 
              `Horizontal: ~${BlindCalculations.formatSingleUnit(blind.width / (calculations.ringRows - 1), units)}`
            ),
            React.createElement('p', { key: `spacing-vertical-${index}` }, 
              `Vertical: ~${BlindCalculations.formatSingleUnit(blind.height / (calculations.verticalRings + 1), units)}`
            )
          ]);
        }))
      ]),
      
      // Construction tips
      React.createElement('div', {
        key: 'construction-tips',
        className: "p-4 bg-indigo-100 rounded-lg"
      }, [
        React.createElement('h4', {
          key: 'tips-title',
          className: "font-medium text-indigo-900 mb-2"
        }, '💡 Construction Tips'),
        React.createElement('ul', {
          key: 'tips-list',
          className: "list-disc pl-5 space-y-1 text-sm text-indigo-900"
        }, [
          React.createElement('li', { key: 'tips-1' }, 'For easier threading, use a large-eye needle to pull cord through rings'),
          React.createElement('li', { key: 'tips-2' }, 'Pre-mark all ring positions before sewing to ensure alignment'),
          React.createElement('li', { key: 'tips-3' }, 'Reinforce ring attachment points with extra stitching'),
          React.createElement('li', { key: 'tips-4' }, 'Test cord operation before final assembly to ensure smooth movement'),
          React.createElement('li', { key: 'tips-5' }, 'For wider blinds, consider adding support strips to prevent sagging')
        ])
      ])
    ])
  ]);
};
