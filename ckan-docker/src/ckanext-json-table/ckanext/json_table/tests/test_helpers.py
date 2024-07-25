"""Tests for helpers.py."""

import ckanext.json_table.helpers as helpers


def test_json_table_hello():
    assert helpers.json_table_hello() == "Hello, json_table!"
