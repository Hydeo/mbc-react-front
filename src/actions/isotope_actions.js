import axios from 'axios'
import Isotope from 'isotope-layout';
import { forceCheck } from 'react-lazyload';

import { conf_dev } from '../config';

export const INIT_ISOTOPE = 'INIT_ISOTOPE'
export const UPDATE_ISOTOPE = 'UPDATE_ISOTOPE'
export const SET_ISOTOPE = 'SET_ISOTOPE'

//export const URL_API = "https://my-link-list.herokuapp.com";
export const URL_API = conf_dev.url_api;

export const updateIsotope = (iso_instance = null, force_new = false) => {
	return dispatch => {
		document.getElementById("item_list").style.opacity = "0";
		if (iso_instance == null || force_new == true) {
			console.log("-- init_Isotope --");
			var iso_item_list;
			var item_list = document.querySelector('#item_list');
			//ImagesLoaded("#item_list"),()=>{
			iso_item_list = new Isotope(item_list, {
				itemSelector: ".item_iso",
				percentPosition: true,
				masonry: {
					columnWidth: ".item_sizer",
					gutter: ".item_gutter"
				}
			})

			iso_item_list.on('arrangeComplete', function (filteredItems) {
				console.log('Isotope arrange completed on ' +
					filteredItems.length + ' items');
				document.getElementById("item_list").style.opacity = "1";
			})
			//}
			dispatch({
				type: SET_ISOTOPE,
				payload: iso_item_list
			})

			iso_item_list.arrange();
		}
		else {
			iso_instance.reloadItems()
			iso_instance.arrange();
		}
		//Force check lazyload after isotope layout has been created
		forceCheck();
	}
}

export const set_isotope = (isotope) => {
	return dispatch => {
		dispatch({
			type: SET_ISOTOPE,
			payload: isotope
		})
	}
}