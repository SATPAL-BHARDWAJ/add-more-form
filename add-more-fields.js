/**
 * Add more forms v0.0.1
 * Author: Satpal Bhardwaj
 * Description: Add more forms, change each input naming and grouping
 * 
 * options: {
 *  disable-naming: boolean,
 *  wrapper: string,
 *  group: string,
 *  add-btn: string,
 *  remove-btn: string
 * }
 */

(function($) {

    let trimAttr = function (attr) {
        return attr.replace('[', '').replace(']', '');
    }

    $.fn.replicate = function(options = {}) {
        let disableNaming = options['disable-naming'];
        let wrapper = options['wrapper'];
        let group = options['group'];
        let addBtn = options['add-btn'];
        let removeBtn = options['remove-btn'];

        let array_name = $(this).attr(trimAttr(wrapper));

        let setupInputNames = (wrape) => {
            $(wrape).find(group).each((index, element) => {
                $(element).attr(trimAttr(group), index);

                $(element).find('input, select').each( (ix, element) => {
                    let name = getInputName(element);
                    $(element).attr('name', `${array_name}[${index}][${name}]`);
                })
            })
        }

        let getInputName = (input) => {
            let n = $(input).attr('data-name');

            if (!n) {
                n = $(input).attr('name');
                $(input).attr('data-name', n);
            }

            return n;
        }

        if (!disableNaming) {
            setupInputNames(this);
        }

        $(this).on('click', addBtn, function() {
            let newGroup = $(this).closest(group).clone();

            newGroup.find('input:not(:radio), select').val('');
            newGroup.find('input:radio, input:checkbox').each((i, el) => {
                el.checked = false;
            })

            $(newGroup).insertAfter($(this).closest(group));

            if (!disableNaming) {
                setupInputNames($(this).closest(wrapper));
            }
        })

        $(this).on('click', removeBtn, function() {
            let wrap = $(this).closest(wrapper);
            let allGroups = $(wrap).find(group);

            if ( allGroups.length <= 1 ) {
                alert('At least one item is required!');
                return;
            }

            $(this).closest(group).remove();

            if (!disableNaming) {
                setupInputNames($(wrap));
            }
        })
    }

} (jQuery))
