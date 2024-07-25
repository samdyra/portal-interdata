"""Tests for validators.py."""

import pytest

import ckan.plugins.toolkit as tk

from ckanext.json_table.logic import validators


def test_json_table_reauired_with_valid_value():
    assert validators.json_table_required("value") == "value"


def test_json_table_reauired_with_invalid_value():
    with pytest.raises(tk.Invalid):
        validators.json_table_required(None)
