'use strict';

(() => {
    class Tabs {
        static defaults() {
            return {
                selectedClass: 'selected'
            }
        }

        constructor(el, options) {
            // Cache <ul /> node.
            this.tabs = el;

            // Cache <a /> nodes.
            this.tabItems = this.tabs.querySelectorAll('a');

            // Create an array of target ID's.v
            this.targets = [];

            this.tabItems.forEach(el => {
                this.targets.push(el.hash);
            });

            // Cache the target <div /> panels.
            this.panels = [];

            this.targets.forEach(hash => {
                this.panels.push(document.getElementById(hash.substr(1)));
            });

            // Declare some class config options.
            this.options = Object.assign({}, Tabs.defaults(), options);

            this.attachEvents();
            this.tab();
        }

        /**
         * 1. <a /> click event to show/hide tab panels.
         */
        attachEvents() {
            // [1]
            this.tabItems.forEach(el => {
                el.addEventListener('click', (e) => {
                    e.preventDefault();

                    this.tab(e.target.hash);
                });
            });
        }

        /**
         * Show the corresponding panel element for the given ID
         * value.
         * @param  {string} id [hash value of clicked <a /> tab item]
         */
        tab(id) {
            if(!id) {
                // Check if a tab node has the selected css class (selectedClass)
                let s;

                this.tabItems.forEach(tab => {
                    if(tab.className.indexOf(this.options.selectedClass) !== -1) {
                        s = tab;
                    }
                });

                id = s ? s.hash : this.targets[0];
            }

            // Add selected class to the tab (<a />) nodes and find the
            // selected tab.
            this.tabItems.forEach(tab => {
                let selected = tab.hash === id;

                tab.classList[selected ? 'add' : 'remove'](this.options.selectedClass);
                tab.setAttribute('aria-selected', selected);
            });

            // Hide all the panel <div /> nodes and then show the
            // selected one.
            this.panels.forEach(panel => {
                let selected = panel.id === id.substr(1);

                panel.style.display = (!selected ? 'none' : '');
                panel.classList[selected ? 'add' : 'remove'](this.options.selectedClass);
                panel.setAttribute('aria-hidden', !selected);
            });
        }
    }

    // Initialise a new Tabs instance.
    let els = document.getElementsByClassName('js-tabs');

    for(let i = 0; i <= els.length - 1; i++) {
        let tab = new Tabs(els[i], {
            selectedClass: 'bums'
        });
    }
})();

